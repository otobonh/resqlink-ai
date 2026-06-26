-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('admin', 'organization', 'volunteer', 'citizen')),
  avatar_url TEXT,
  location GEOGRAPHY(POINT, 4326),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ngo', 'hospital', 'government', 'private', 'volunteer_group')),
  description TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  website TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  address TEXT NOT NULL DEFAULT '',
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Volunteers
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'unavailable')),
  location GEOGRAPHY(POINT, 4326),
  availability_start TIMESTAMPTZ,
  availability_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Incidents
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('trapped', 'medical', 'fire', 'structural', 'flood', 'landslide', 'missing', 'shelter', 'food_water', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'resolved', 'closed')),
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  address TEXT NOT NULL,
  affected_people INTEGER NOT NULL DEFAULT 1,
  photos TEXT[] NOT NULL DEFAULT '{}',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id TEXT NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('food', 'water', 'medicine', 'clothing', 'shelter', 'transport', 'equipment', 'personnel', 'blood', 'other')),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'unidades',
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  address TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  contact_phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assignments
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  resource_id UUID REFERENCES resources(id) ON DELETE SET NULL,
  notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hospitals
CREATE TABLE hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 0,
  available_beds INTEGER NOT NULL DEFAULT 0,
  has_emergency BOOLEAN NOT NULL DEFAULT TRUE,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shelters
CREATE TABLE shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 0,
  current_occupancy INTEGER NOT NULL DEFAULT 0,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  contact_phone TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system' CHECK (type IN ('incident', 'assignment', 'resource', 'system')),
  read BOOLEAN NOT NULL DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activity logs
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_priority ON incidents(priority);
CREATE INDEX idx_incidents_category ON incidents(category);
CREATE INDEX idx_incidents_location ON incidents USING GIST(location);
CREATE INDEX idx_incidents_created ON incidents(created_at DESC);

CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_available ON resources(available);
CREATE INDEX idx_resources_location ON resources USING GIST(location);

CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_volunteers_user ON volunteers(user_id);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Public read for critical tables (emergency context)
CREATE POLICY "Public read incidents" ON incidents FOR SELECT USING (true);
CREATE POLICY "Public read resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Public read hospitals" ON hospitals FOR SELECT USING (true);
CREATE POLICY "Public read shelters" ON shelters FOR SELECT USING (true);

-- Anyone can create incidents (emergency)
CREATE POLICY "Anyone can report" ON incidents FOR INSERT WITH CHECK (true);

-- Anyone can offer resources
CREATE POLICY "Anyone can offer resources" ON resources FOR INSERT WITH CHECK (true);

-- Users manage own data
CREATE POLICY "Users read own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Notifications
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);

-- Admin full access
CREATE POLICY "Admin full access incidents" ON incidents FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE incidents;
ALTER PUBLICATION supabase_realtime ADD TABLE resources;
ALTER PUBLICATION supabase_realtime ADD TABLE assignments;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
