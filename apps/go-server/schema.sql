--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Debian 12.15-1.pgdg110+1)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO postgres;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: gen_hasura_uuid(); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid
    LANGUAGE sql
    AS $$select gen_random_uuid()$$;


ALTER FUNCTION hdb_catalog.gen_hasura_uuid() OWNER TO postgres;

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO postgres;

--
-- Name: hdb_cron_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_cron_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_cron_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_cron_events OWNER TO postgres;

--
-- Name: hdb_metadata; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE hdb_catalog.hdb_metadata OWNER TO postgres;

--
-- Name: hdb_scheduled_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_scheduled_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_scheduled_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_scheduled_events OWNER TO postgres;

--
-- Name: hdb_schema_notifications; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);


ALTER TABLE hdb_catalog.hdb_schema_notifications OWNER TO postgres;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    ee_client_id text,
    ee_client_secret text
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO postgres;

--
-- Name: background; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.background (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image_url text
);


ALTER TABLE public.background OWNER TO postgres;

--
-- Name: TABLE background; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.background IS 'Playable backgrounds';


--
-- Name: celestial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.celestial (
    name character varying,
    galaxy_id uuid NOT NULL,
    owner_id character varying,
    id character varying NOT NULL,
    galactic_empire_id uuid,
    forming_points numeric DEFAULT '10'::numeric NOT NULL
);


ALTER TABLE public.celestial OWNER TO postgres;

--
-- Name: chat_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_message (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    message text NOT NULL,
    poster_id character varying DEFAULT 'current_user'::character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.chat_message OWNER TO postgres;

--
-- Name: faction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faction (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image_url text
);


ALTER TABLE public.faction OWNER TO postgres;

--
-- Name: TABLE faction; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.faction IS 'NPC factions';


--
-- Name: galactic_empire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galactic_empire (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id text NOT NULL,
    galaxy_id uuid NOT NULL,
    background_id uuid NOT NULL,
    faction_id uuid NOT NULL,
    playable_race_id uuid NOT NULL,
    homeworld_id uuid,
    celestial_claims integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.galactic_empire OWNER TO postgres;

--
-- Name: galactic_empire_npc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galactic_empire_npc (
    npc_id uuid NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    galactic_empire_id uuid NOT NULL
);


ALTER TABLE public.galactic_empire_npc OWNER TO postgres;

--
-- Name: TABLE galactic_empire_npc; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.galactic_empire_npc IS 'NPCs unlocked for this empire';


--
-- Name: galactic_empire_quest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galactic_empire_quest (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    galactic_empire_id uuid NOT NULL,
    quest_id uuid NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    quest_step_id uuid NOT NULL
);


ALTER TABLE public.galactic_empire_quest OWNER TO postgres;

--
-- Name: galactic_empire_resource_generator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galactic_empire_resource_generator (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    galactic_empire_id uuid NOT NULL,
    generator_type_id uuid NOT NULL,
    planet_id uuid,
    count numeric DEFAULT '1'::numeric NOT NULL
);


ALTER TABLE public.galactic_empire_resource_generator OWNER TO postgres;

--
-- Name: galactic_empire_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galactic_empire_resources (
    resource_type_id uuid NOT NULL,
    value integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    galactic_empire_id uuid NOT NULL
);


ALTER TABLE public.galactic_empire_resources OWNER TO postgres;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galaxy (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying,
    radius integer NOT NULL,
    arms numeric NOT NULL,
    curvature numeric NOT NULL,
    arm_width numeric NOT NULL,
    core_radius_factor numeric NOT NULL,
    core_concentration_factor numeric NOT NULL,
    stars integer NOT NULL,
    CONSTRAINT arm_width_check CHECK (((arm_width > (0)::numeric) AND (arm_width <= 0.2))),
    CONSTRAINT arms_number_check CHECK (((arms > (0)::numeric) AND (arms <= (10)::numeric))),
    CONSTRAINT core_concentration_check CHECK (((core_concentration_factor > (0)::numeric) AND (core_concentration_factor <= (3)::numeric))),
    CONSTRAINT core_radius_factor_check CHECK (((core_radius_factor > (0)::numeric) AND (core_radius_factor <= 0.05))),
    CONSTRAINT curvature_check CHECK (((curvature > ('-5'::integer)::numeric) AND (curvature <= (5)::numeric))),
    CONSTRAINT radius_check CHECK (((radius >= 0) AND (radius <= 1000)))
);


ALTER TABLE public.galaxy OWNER TO postgres;

--
-- Name: npc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.npc (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    race_id uuid,
    faction_id uuid,
    image_url text NOT NULL
);


ALTER TABLE public.npc OWNER TO postgres;

--
-- Name: TABLE npc; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.npc IS 'non-playable characters';


--
-- Name: planet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planet (
    id uuid NOT NULL,
    celestial_id text NOT NULL,
    radius numeric NOT NULL,
    texture_resolution integer NOT NULL,
    terrain_bias numeric[] NOT NULL,
    terrain_hex_palette_id uuid NOT NULL,
    owner_id character varying NOT NULL,
    name text NOT NULL,
    atmospheric_distance numeric DEFAULT '1'::numeric NOT NULL,
    orbital_radius numeric
);


ALTER TABLE public.planet OWNER TO postgres;

--
-- Name: planetary_ring; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planetary_ring (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    rotation numeric[] NOT NULL,
    type text NOT NULL,
    colors text[] NOT NULL,
    terrain_bias numeric[] NOT NULL,
    inner_radius numeric NOT NULL,
    outer_radius numeric NOT NULL,
    resolution integer NOT NULL
);


ALTER TABLE public.planetary_ring OWNER TO postgres;

--
-- Name: playable_race; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playable_race (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image_url text
);


ALTER TABLE public.playable_race OWNER TO postgres;

--
-- Name: TABLE playable_race; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.playable_race IS 'Playable races';


--
-- Name: quest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    type text NOT NULL,
    next_quest_in_chain uuid,
    initial boolean,
    image_url text
);


ALTER TABLE public.quest OWNER TO postgres;

--
-- Name: quest_reward; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_reward (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    quest_id uuid NOT NULL,
    type text NOT NULL,
    resource_accrual_type_id uuid,
    resource_accrual_amount integer,
    npc_unlock_id uuid,
    resource_unlock_id uuid
);


ALTER TABLE public.quest_reward OWNER TO postgres;

--
-- Name: quest_reward_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_reward_type (
    value text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.quest_reward_type OWNER TO postgres;

--
-- Name: quest_step; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_step (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    description text NOT NULL,
    type text NOT NULL,
    quest_id uuid NOT NULL,
    npc_contact_id uuid,
    resource_cost_id uuid,
    resource_cost_amount integer,
    next_step_in_quest uuid,
    initial boolean DEFAULT false NOT NULL
);


ALTER TABLE public.quest_step OWNER TO postgres;

--
-- Name: quest_step_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_step_type (
    value text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.quest_step_type OWNER TO postgres;

--
-- Name: quest_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_type (
    value text NOT NULL
);


ALTER TABLE public.quest_type OWNER TO postgres;

--
-- Name: resource_generator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resource_generator (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    generation_rate numeric[] NOT NULL,
    image_url text,
    resource_type_1_id uuid NOT NULL,
    resource_type_2_id uuid,
    unlocked_by_technology_id uuid,
    cost_resource_type_id_1 uuid DEFAULT 'd10375d2-ef6e-4afc-9ada-cd80b8282954'::uuid NOT NULL,
    cost_amount_1 numeric DEFAULT '1'::numeric NOT NULL,
    cost_growth_exponent numeric DEFAULT 1.5 NOT NULL
);


ALTER TABLE public.resource_generator OWNER TO postgres;

--
-- Name: resource_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resource_type (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type text NOT NULL,
    image_url_pixel text,
    image_url text
);


ALTER TABLE public.resource_type OWNER TO postgres;

--
-- Name: technology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.technology (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    children uuid[] DEFAULT '{}'::uuid[] NOT NULL,
    root boolean,
    research_cost integer DEFAULT 0 NOT NULL,
    image_url text
);


ALTER TABLE public.technology OWNER TO postgres;

--
-- Name: terrain_hex_palette; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.terrain_hex_palette (
    water text NOT NULL,
    sand text NOT NULL,
    grass text NOT NULL,
    forest text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.terrain_hex_palette OWNER TO postgres;

--
-- Name: user_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_info (
    id character varying NOT NULL,
    nickname character varying NOT NULL,
    secret_setting_test text,
    name character varying,
    display_name character varying,
    free_claims integer DEFAULT 1 NOT NULL,
    avatar_url text,
    CONSTRAINT display_name_min_length CHECK (((display_name IS NOT NULL) OR ((char_length((display_name)::text) > 3) AND (char_length((display_name)::text) < 12))))
);


ALTER TABLE public.user_info OWNER TO postgres;

--
-- Name: user_me; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.user_me AS
 SELECT user_info.id,
    user_info.nickname,
    user_info.secret_setting_test,
    user_info.name,
    user_info.display_name,
    user_info.free_claims,
    user_info.avatar_url
   FROM public.user_info;


ALTER VIEW public.user_me OWNER TO postgres;

--
-- Name: user_private; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.user_private AS
 SELECT user_info.id AS user_id,
    user_info.secret_setting_test
   FROM public.user_info;


ALTER VIEW public.user_private OWNER TO postgres;

--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_events hdb_cron_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_events
    ADD CONSTRAINT hdb_cron_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_resource_version_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_resource_version_key UNIQUE (resource_version);


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_scheduled_events hdb_scheduled_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_events
    ADD CONSTRAINT hdb_scheduled_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_schema_notifications hdb_schema_notifications_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_schema_notifications
    ADD CONSTRAINT hdb_schema_notifications_pkey PRIMARY KEY (id);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: background background_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background
    ADD CONSTRAINT background_name_key UNIQUE (name);


--
-- Name: background background_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background
    ADD CONSTRAINT background_pkey PRIMARY KEY (id);


--
-- Name: celestial celestial_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.celestial
    ADD CONSTRAINT celestial_name_key UNIQUE (name);


--
-- Name: chat_message chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: faction faction_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faction
    ADD CONSTRAINT faction_name_key UNIQUE (name);


--
-- Name: faction faction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faction
    ADD CONSTRAINT faction_pkey PRIMARY KEY (id);


--
-- Name: galactic_empire_npc galactic_empire_npc_npc_id_galactic_empire_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_npc
    ADD CONSTRAINT galactic_empire_npc_npc_id_galactic_empire_id_key UNIQUE (npc_id, galactic_empire_id);


--
-- Name: galactic_empire_npc galactic_empire_npc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_npc
    ADD CONSTRAINT galactic_empire_npc_pkey PRIMARY KEY (id);


--
-- Name: galactic_empire galactic_empire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_pkey PRIMARY KEY (id);


--
-- Name: galactic_empire_quest galactic_empire_quest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_quest
    ADD CONSTRAINT galactic_empire_quest_pkey PRIMARY KEY (id);


--
-- Name: galactic_empire_resources galactic_empire_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resources
    ADD CONSTRAINT galactic_empire_resources_pkey PRIMARY KEY (id);


--
-- Name: galactic_empire_resources galactic_empire_resources_resource_type_id_galactic_empire_id_k; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resources
    ADD CONSTRAINT galactic_empire_resources_resource_type_id_galactic_empire_id_k UNIQUE (resource_type_id, galactic_empire_id);


--
-- Name: galactic_empire galactic_empire_user_id_galaxy_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_user_id_galaxy_id_key UNIQUE (user_id, galaxy_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (id);


--
-- Name: npc npc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.npc
    ADD CONSTRAINT npc_pkey PRIMARY KEY (id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (id);


--
-- Name: planetary_ring planetary_ring_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planetary_ring
    ADD CONSTRAINT planetary_ring_pkey PRIMARY KEY (id);


--
-- Name: playable_race playable_race_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable_race
    ADD CONSTRAINT playable_race_pkey PRIMARY KEY (id);


--
-- Name: quest quest_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest
    ADD CONSTRAINT quest_name_key UNIQUE (name);


--
-- Name: quest quest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest
    ADD CONSTRAINT quest_pkey PRIMARY KEY (id);


--
-- Name: quest_reward quest_reward_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward
    ADD CONSTRAINT quest_reward_pkey PRIMARY KEY (id);


--
-- Name: quest_reward_type quest_reward_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward_type
    ADD CONSTRAINT quest_reward_type_pkey PRIMARY KEY (value);


--
-- Name: quest_step quest_step_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step
    ADD CONSTRAINT quest_step_pkey PRIMARY KEY (id);


--
-- Name: quest_step_type quest_step_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step_type
    ADD CONSTRAINT quest_step_type_pkey PRIMARY KEY (value);


--
-- Name: quest_type quest_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_type
    ADD CONSTRAINT quest_type_pkey PRIMARY KEY (value);


--
-- Name: galactic_empire_resource_generator resource_generator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resource_generator
    ADD CONSTRAINT resource_generator_pkey PRIMARY KEY (id);


--
-- Name: resource_generator resource_generator_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_generator
    ADD CONSTRAINT resource_generator_type_pkey PRIMARY KEY (id);


--
-- Name: resource_type resource_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_type
    ADD CONSTRAINT resource_types_pkey PRIMARY KEY (id);


--
-- Name: resource_type resource_types_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_type
    ADD CONSTRAINT resource_types_type_key UNIQUE (type);


--
-- Name: celestial system_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.celestial
    ADD CONSTRAINT system_pkey PRIMARY KEY (id);


--
-- Name: technology technology_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technology
    ADD CONSTRAINT technology_name_key UNIQUE (name);


--
-- Name: technology technology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technology
    ADD CONSTRAINT technology_pkey PRIMARY KEY (id);


--
-- Name: terrain_hex_palette terrain_hex_palette_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.terrain_hex_palette
    ADD CONSTRAINT terrain_hex_palette_name_key UNIQUE (name);


--
-- Name: terrain_hex_palette terrain_hex_palette_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.terrain_hex_palette
    ADD CONSTRAINT terrain_hex_palette_pkey PRIMARY KEY (id);


--
-- Name: user_info user_info_display_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_display_name_key UNIQUE (display_name);


--
-- Name: user_info user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_event_id; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);


--
-- Name: hdb_cron_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);


--
-- Name: hdb_cron_events_unique_scheduled; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);


--
-- Name: hdb_scheduled_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: galactic_empire_resources set_public_galactic_empire_resources_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_galactic_empire_resources_updated_at BEFORE UPDATE ON public.galactic_empire_resources FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_galactic_empire_resources_updated_at ON galactic_empire_resources; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_galactic_empire_resources_updated_at ON public.galactic_empire_resources IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: galactic_empire_resource_generator set_public_resource_generator_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_resource_generator_updated_at BEFORE UPDATE ON public.galactic_empire_resource_generator FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_resource_generator_updated_at ON galactic_empire_resource_generator; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_resource_generator_updated_at ON public.galactic_empire_resource_generator IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_message chat_messages_poster_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_messages_poster_id_fkey FOREIGN KEY (poster_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire galactic_empire_background_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_background_id_fkey FOREIGN KEY (background_id) REFERENCES public.background(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire galactic_empire_faction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_faction_id_fkey FOREIGN KEY (faction_id) REFERENCES public.faction(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire galactic_empire_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire galactic_empire_homeworld_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_homeworld_id_fkey FOREIGN KEY (homeworld_id) REFERENCES public.planet(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire_npc galactic_empire_npc_galactic_empire_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_npc
    ADD CONSTRAINT galactic_empire_npc_galactic_empire_id_fkey FOREIGN KEY (galactic_empire_id) REFERENCES public.galactic_empire(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: galactic_empire_npc galactic_empire_npc_npc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_npc
    ADD CONSTRAINT galactic_empire_npc_npc_id_fkey FOREIGN KEY (npc_id) REFERENCES public.npc(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire galactic_empire_playable_race_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_playable_race_id_fkey FOREIGN KEY (playable_race_id) REFERENCES public.playable_race(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire_quest galactic_empire_quest_galactic_empire_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_quest
    ADD CONSTRAINT galactic_empire_quest_galactic_empire_id_fkey FOREIGN KEY (galactic_empire_id) REFERENCES public.galactic_empire(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: galactic_empire_quest galactic_empire_quest_quest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_quest
    ADD CONSTRAINT galactic_empire_quest_quest_id_fkey FOREIGN KEY (quest_id) REFERENCES public.quest(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire_quest galactic_empire_quest_quest_step_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_quest
    ADD CONSTRAINT galactic_empire_quest_quest_step_id_fkey FOREIGN KEY (quest_step_id) REFERENCES public.quest_step(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire_resource_generator galactic_empire_resource_generator_galactic_empire_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resource_generator
    ADD CONSTRAINT galactic_empire_resource_generator_galactic_empire_id_fkey FOREIGN KEY (galactic_empire_id) REFERENCES public.galactic_empire(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: galactic_empire_resource_generator galactic_empire_resource_generator_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resource_generator
    ADD CONSTRAINT galactic_empire_resource_generator_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: galactic_empire_resources galactic_empire_resources_galactic_empire_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resources
    ADD CONSTRAINT galactic_empire_resources_galactic_empire_id_fkey FOREIGN KEY (galactic_empire_id) REFERENCES public.galactic_empire(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: galactic_empire_resources galactic_empire_resources_resource_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resources
    ADD CONSTRAINT galactic_empire_resources_resource_type_id_fkey FOREIGN KEY (resource_type_id) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire galactic_empire_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire
    ADD CONSTRAINT galactic_empire_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: npc npc_faction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.npc
    ADD CONSTRAINT npc_faction_id_fkey FOREIGN KEY (faction_id) REFERENCES public.faction(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: npc npc_race_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.npc
    ADD CONSTRAINT npc_race_id_fkey FOREIGN KEY (race_id) REFERENCES public.playable_race(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: planet planet_celestial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_celestial_id_fkey FOREIGN KEY (celestial_id) REFERENCES public.celestial(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: planet planet_terrain_hex_palette_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_terrain_hex_palette_id_fkey FOREIGN KEY (terrain_hex_palette_id) REFERENCES public.terrain_hex_palette(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest quest_next_quest_in_chain_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest
    ADD CONSTRAINT quest_next_quest_in_chain_fkey FOREIGN KEY (next_quest_in_chain) REFERENCES public.quest(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_reward quest_reward_npc_unlock_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward
    ADD CONSTRAINT quest_reward_npc_unlock_id_fkey FOREIGN KEY (npc_unlock_id) REFERENCES public.npc(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_reward quest_reward_quest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward
    ADD CONSTRAINT quest_reward_quest_id_fkey FOREIGN KEY (quest_id) REFERENCES public.quest(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_reward quest_reward_resource_accrual_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward
    ADD CONSTRAINT quest_reward_resource_accrual_type_id_fkey FOREIGN KEY (resource_accrual_type_id) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_reward quest_reward_resource_unlock_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward
    ADD CONSTRAINT quest_reward_resource_unlock_id_fkey FOREIGN KEY (resource_unlock_id) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_reward quest_reward_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_reward
    ADD CONSTRAINT quest_reward_type_fkey FOREIGN KEY (type) REFERENCES public.quest_reward_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_step quest_step_next_step_in_quest_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step
    ADD CONSTRAINT quest_step_next_step_in_quest_fkey FOREIGN KEY (next_step_in_quest) REFERENCES public.quest_step(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_step quest_step_npc_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step
    ADD CONSTRAINT quest_step_npc_contact_id_fkey FOREIGN KEY (npc_contact_id) REFERENCES public.npc(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_step quest_step_quest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step
    ADD CONSTRAINT quest_step_quest_id_fkey FOREIGN KEY (quest_id) REFERENCES public.quest(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_step quest_step_resource_cost_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step
    ADD CONSTRAINT quest_step_resource_cost_id_fkey FOREIGN KEY (resource_cost_id) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest_step quest_step_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_step
    ADD CONSTRAINT quest_step_type_fkey FOREIGN KEY (type) REFERENCES public.quest_step_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: quest quest_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest
    ADD CONSTRAINT quest_type_fkey FOREIGN KEY (type) REFERENCES public.quest_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: resource_generator resource_generator_cost_resource_type_id_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_generator
    ADD CONSTRAINT resource_generator_cost_resource_type_id_1_fkey FOREIGN KEY (cost_resource_type_id_1) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: galactic_empire_resource_generator resource_generator_generator_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galactic_empire_resource_generator
    ADD CONSTRAINT resource_generator_generator_type_id_fkey FOREIGN KEY (generator_type_id) REFERENCES public.resource_generator(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: resource_generator resource_generator_type_resource_type_1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_generator
    ADD CONSTRAINT resource_generator_type_resource_type_1_id_fkey FOREIGN KEY (resource_type_1_id) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: resource_generator resource_generator_type_resource_type_2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_generator
    ADD CONSTRAINT resource_generator_type_resource_type_2_id_fkey FOREIGN KEY (resource_type_2_id) REFERENCES public.resource_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: resource_generator resource_generator_type_unlocked_by_technology_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_generator
    ADD CONSTRAINT resource_generator_type_unlocked_by_technology_id_fkey FOREIGN KEY (unlocked_by_technology_id) REFERENCES public.technology(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: celestial system_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.celestial
    ADD CONSTRAINT system_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: celestial system_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.celestial
    ADD CONSTRAINT system_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

