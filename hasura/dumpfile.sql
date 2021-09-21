SET check_function_bodies = false;
CREATE TABLE public.chat_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message text NOT NULL,
    poster_id character varying DEFAULT 'current_user'::character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.cluster (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    galaxy_id uuid NOT NULL,
    name character varying
);
CREATE TABLE public.galaxy (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying
);
CREATE TABLE public.idle_test (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    counter integer DEFAULT 0 NOT NULL,
    owner_id character varying
);
CREATE TABLE public.system (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    cluster_id uuid NOT NULL,
    name character varying
);
CREATE TABLE public.user_info (
    id character varying NOT NULL,
    nickname character varying NOT NULL,
    secret_setting_test text,
    name character varying
);
CREATE VIEW public.user_private AS
 SELECT user_info.id AS user_id,
    user_info.secret_setting_test
   FROM public.user_info;
ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.cluster
    ADD CONSTRAINT cluster_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.idle_test
    ADD CONSTRAINT idle_test_owner_id_key UNIQUE (owner_id);
ALTER TABLE ONLY public.idle_test
    ADD CONSTRAINT idle_test_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.system
    ADD CONSTRAINT system_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_nickname_key UNIQUE (nickname);
ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_poster_id_fkey FOREIGN KEY (poster_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.cluster
    ADD CONSTRAINT cluster_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.idle_test
    ADD CONSTRAINT idle_test_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.system
    ADD CONSTRAINT system_cluster_id_fkey FOREIGN KEY (cluster_id) REFERENCES public.cluster(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
