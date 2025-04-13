--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ProductType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductType" (
    "Type" text NOT NULL,
    "isDeleted" boolean NOT NULL,
    "CreatedDate" text NOT NULL,
    "ProductTypeId" integer NOT NULL
);


ALTER TABLE public."ProductType" OWNER TO postgres;

--
-- Name: ProductType_ProductTypeId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductType_ProductTypeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductType_ProductTypeId_seq" OWNER TO postgres;

--
-- Name: ProductType_ProductTypeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductType_ProductTypeId_seq" OWNED BY public."ProductType"."ProductTypeId";


--
-- Name: Products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Products" (
    "categoryId" integer NOT NULL,
    "ProductTypeId" integer NOT NULL,
    name text NOT NULL,
    "imageName" text NOT NULL,
    "imageUrl" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "ProductId" integer NOT NULL,
    "Description" text,
    "DiscountPrice" integer,
    "ProductPrice" integer,
    "ProductStatus" text,
    "Stock" integer,
    "productInto" text
);


ALTER TABLE public."Products" OWNER TO postgres;

--
-- Name: Products_ProductId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Products_ProductId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Products_ProductId_seq" OWNER TO postgres;

--
-- Name: Products_ProductId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Products_ProductId_seq" OWNED BY public."Products"."ProductId";


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    title text NOT NULL,
    description text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "imageName" text NOT NULL,
    "imageUrl" text NOT NULL,
    "CategoryId" integer NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_CategoryId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."category_CategoryId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."category_CategoryId_seq" OWNER TO postgres;

--
-- Name: category_CategoryId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."category_CategoryId_seq" OWNED BY public.category."CategoryId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "isDeleted" boolean NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ProductType ProductTypeId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductType" ALTER COLUMN "ProductTypeId" SET DEFAULT nextval('public."ProductType_ProductTypeId_seq"'::regclass);


--
-- Name: Products ProductId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products" ALTER COLUMN "ProductId" SET DEFAULT nextval('public."Products_ProductId_seq"'::regclass);


--
-- Name: category CategoryId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN "CategoryId" SET DEFAULT nextval('public."category_CategoryId_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ProductType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductType" ("Type", "isDeleted", "CreatedDate", "ProductTypeId") FROM stdin;
Tshirt	f	1	1
Jacket	f	1	2
Pants	f	1	3
Hoodie	f	1	4
Short	f	1	5
Others	f	1	6
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Products" ("categoryId", "ProductTypeId", name, "imageName", "imageUrl", "isDeleted", "ProductId", "Description", "DiscountPrice", "ProductPrice", "ProductStatus", "Stock", "productInto") FROM stdin;
1	1	Athletic Men's Shorts Sleeve Performance T-Shirt	8e90b8ba5cf712dde43179871b3d9513e884d66e-412x606.jpg;437939aae3f64a2c56fda9cd6ef105fc3d08f4ae-486x513.jpg;b2af7e0b3861d3a0d667beb3adbc2a98c4ef2651-508x491.jpg	ProductImages/b2af7e0b3861d3a0d667beb3adbc2a98c4ef2651-508x491.jpg;ProductImages/437939aae3f64a2c56fda9cd6ef105fc3d08f4ae-486x513.jpg;ProductImages/b2af7e0b3861d3a0d667beb3adbc2a98c4ef2651-508x491.jpg	f	1	Some Text	10	63	Hot	10	Simple t-shirt for daily use
2	1	Women Basic short Sleeve Crew Neck T Shirt	b2af7e0b3861d3a0d667beb3adbc2a98c4ef2651-508x491.jpg;8e90b8ba5cf712dde43179871b3d9513e884d66e-412x606.jpg;437939aae3f64a2c56fda9cd6ef105fc3d08f4ae-486x513.jpg	ProductImages/b2af7e0b3861d3a0d667beb3adbc2a98c4ef2651-508x491.jpg;ProductImages/b2af7e0b3861d3a0d667beb3adbc2a98c4ef2651-508x491.jpg;ProductImages/437939aae3f64a2c56fda9cd6ef105fc3d08f4ae-486x513.jpg	f	2	Some text	10	55	New	5	Classic t-shirt for daily use
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
28a42b2c-5334-439d-92bd-44bd629b3a3c	0df1087adf6ab5d2e53432b6e1b6cb664c6db252c7b27ad0ca87a420f9a9de8a	2025-01-19 09:08:26.528189+05:30	20250118053505_init	\N	\N	2025-01-19 09:08:26.515375+05:30	1
c9710065-25f0-4fcd-897a-61a825188c83	a3948a16830b494d835133bc0adf11106ad11eb2306a28696e444f43f3f025a3	2025-01-19 09:08:26.542298+05:30	20250118104557_init	\N	\N	2025-01-19 09:08:26.529097+05:30	1
642d1b52-98de-4486-95d9-3218b985d9ca	7cddef859e880bab2f2f565b72efd9226d94c05938e18300a34837f75defc7f5	2025-01-19 09:08:26.546947+05:30	20250118104742_init	\N	\N	2025-01-19 09:08:26.543051+05:30	1
dad48bdd-8f20-4c37-bce3-98b71673558c	d9aa36d4cf4b2770cfe225f639b0b80aeb3a833b0b7a9a678c27c603bef8a791	2025-01-19 10:53:52.647404+05:30	20250119052301_test	\N	\N	2025-01-19 10:53:52.64369+05:30	1
64045399-eb08-4939-9c75-460cca4f2d8c	9d3c86ef3f8bbb6dfbd86cd1562ba34757b8697da2d1190e8fd52d50499bc646	2025-01-19 10:56:12.667579+05:30	20250119052524_testmodel	\N	\N	2025-01-19 10:56:12.656531+05:30	1
b90b2dea-53e2-4a75-865d-93e763328880	9243acee511966860b3fbccc3139552d8e39946894239782e5b5ba554335e6ae	2025-01-19 10:58:34.214183+05:30	20250119052755_testing_complete	\N	\N	2025-01-19 10:58:34.208705+05:30	1
54999201-0d11-4ecd-afb4-8fbddd5fbe4d	7697ec3b6731f4eac298835d0cd67fe7aab9ce588e2a7fd9d43fe0cc1aba01ec	2025-01-19 17:23:06.504798+05:30	20250119115144_product_type	\N	\N	2025-01-19 17:23:06.450599+05:30	1
6f2451cc-a5c4-4f1c-8004-52e41857ff4d	94688e241e9cf8322df0c66071966b31b3116c93a4481c58fc73ead8e1ca5204	2025-01-19 17:58:41.46313+05:30	20250119122820_	\N	\N	2025-01-19 17:58:41.382098+05:30	1
0c882310-fec0-44f1-ad6e-9f8de6dd96f9	f65356e2e0a5a9dfbfe6f379648d3f0d9415d1e64d375e6245846d4785efaa8a	2025-01-19 21:35:26.177334+05:30	20250119160506_product_new_schema	\N	\N	2025-01-19 21:35:26.173507+05:30	1
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (title, description, "isDeleted", "imageName", "imageUrl", "CategoryId") FROM stdin;
Featured	Simple t-shirt for daily use	f	Featured.jpg	categoryImages/Featured.jpg	1
Men	Classic t-shirt for daily use	f	Men.jpg	categoryImages/Men.jpg	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "isDeleted") FROM stdin;
1	Neel Udvadia	neel.udvadia@example.com	$2b$10$U6CvC.L8n/FwFnJPuJiw.elWo.wkyDQLyIzfPCiF4JzK00mUoM9cq	f
2	atul chune	atul@example.com	$2b$10$pidE4PWXFURmrtPSbQy5xeoba0sclk3zI7V2dxZyWfJ5IIWgvTwWy	f
\.


--
-- Name: ProductType_ProductTypeId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductType_ProductTypeId_seq"', 6, true);


--
-- Name: Products_ProductId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Products_ProductId_seq"', 2, true);


--
-- Name: category_CategoryId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."category_CategoryId_seq"', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: ProductType ProductType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductType"
    ADD CONSTRAINT "ProductType_pkey" PRIMARY KEY ("ProductTypeId");


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY ("CategoryId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Products Products_ProductTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_ProductTypeId_fkey" FOREIGN KEY ("ProductTypeId") REFERENCES public."ProductType"("ProductTypeId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Products Products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category("CategoryId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

