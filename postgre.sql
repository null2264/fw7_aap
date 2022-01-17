--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

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
-- Name: main; Type: SCHEMA; Schema: -; Owner: ziro
--

CREATE SCHEMA main;


ALTER SCHEMA main OWNER TO ziro;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alumni; Type: TABLE; Schema: public; Owner: ziro
--

CREATE TABLE public.alumni (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    pass character varying(255),
    year bigint,
    prodi character varying(255),
    gender character(1),
    photo character varying(255)
);


ALTER TABLE public.alumni OWNER TO ziro;

--
-- Name: alumni_id_seq; Type: SEQUENCE; Schema: public; Owner: ziro
--

CREATE SEQUENCE public.alumni_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alumni_id_seq OWNER TO ziro;

--
-- Name: alumni_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ziro
--

ALTER SEQUENCE public.alumni_id_seq OWNED BY public.alumni.id;


--
-- Name: alumni id; Type: DEFAULT; Schema: public; Owner: ziro
--

ALTER TABLE ONLY public.alumni ALTER COLUMN id SET DEFAULT nextval('public.alumni_id_seq'::regclass);


--
-- Data for Name: alumni; Type: TABLE DATA; Schema: public; Owner: ziro
--

COPY public.alumni (id, name, email, pass, year, prodi, gender, photo) FROM stdin;
1	Rudi	rudi@gmail.com	123	2021	IT	M	landing1.png
2	null	null@null.null	null	0	IT	M	localhost_8080_(iPhone X).png
\.


--
-- Name: alumni_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ziro
--

SELECT pg_catalog.setval('public.alumni_id_seq', 2, true);


--
-- Name: alumni alumni_pkey; Type: CONSTRAINT; Schema: public; Owner: ziro
--

ALTER TABLE ONLY public.alumni
    ADD CONSTRAINT alumni_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

