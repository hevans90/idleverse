SET check_function_bodies = false;
CREATE TABLE public.celestial (
    name character varying,
    galaxy_id uuid NOT NULL,
    owner_id character varying,
    id character varying NOT NULL
);
CREATE TABLE public.chat_message (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message text NOT NULL,
    poster_id character varying DEFAULT 'current_user'::character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.galaxy (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying,
    radius integer NOT NULL,
    arms numeric NOT NULL,
    curvature numeric NOT NULL,
    arm_width numeric NOT NULL,
    core_radius_factor numeric NOT NULL,
    core_concentration_factor numeric NOT NULL,
    stars integer NOT NULL,
    CONSTRAINT arm_width_check CHECK (
        (
            (arm_width > (0)::numeric)
            AND (arm_width <= 0.2)
        )
    ),
    CONSTRAINT arms_number_check CHECK (
        (
            (arms > (0)::numeric)
            AND (arms <= (10)::numeric)
        )
    ),
    CONSTRAINT core_concentration_check CHECK (
        (
            (core_concentration_factor > (0)::numeric)
            AND (core_concentration_factor <= (3)::numeric)
        )
    ),
    CONSTRAINT core_radius_factor_check CHECK (
        (
            (core_radius_factor > (0)::numeric)
            AND (core_radius_factor <= 0.05)
        )
    ),
    CONSTRAINT curvature_check CHECK (
        (
            (curvature > ('-5'::integer)::numeric)
            AND (curvature <= (5)::numeric)
        )
    ),
    CONSTRAINT radius_check CHECK (
        (
            (radius >= 0)
            AND (radius <= 1000)
        )
    )
);
CREATE TABLE public.user_info (
    id character varying NOT NULL,
    nickname character varying NOT NULL,
    secret_setting_test text,
    name character varying,
    display_name character varying,
    free_claims integer DEFAULT 1 NOT NULL,
    avatar_url text,
    CONSTRAINT display_name_min_length CHECK (
        (
            (display_name IS NOT NULL)
            OR (
                (char_length((display_name)::text) > 3)
                AND (char_length((display_name)::text) < 12)
            )
        )
    )
);
CREATE VIEW public.user_me AS
SELECT user_info.id,
    user_info.nickname,
    user_info.secret_setting_test,
    user_info.name,
    user_info.display_name,
    user_info.free_claims
FROM public.user_info;
CREATE VIEW public.user_private AS
SELECT user_info.id AS user_id,
    user_info.secret_setting_test
FROM public.user_info;
ALTER TABLE ONLY public.chat_message
ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.galaxy
ADD CONSTRAINT galaxy_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.celestial
ADD CONSTRAINT system_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_info
ADD CONSTRAINT user_info_display_name_key UNIQUE (display_name);
ALTER TABLE ONLY public.user_info
ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.chat_message
ADD CONSTRAINT chat_messages_poster_id_fkey FOREIGN KEY (poster_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.celestial
ADD CONSTRAINT system_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.celestial
ADD CONSTRAINT system_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.user_info(id) ON UPDATE RESTRICT ON DELETE RESTRICT;