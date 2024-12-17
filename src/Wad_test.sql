PGDMP  &                    |            WAD_Team_Retired    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16387    WAD_Team_Retired    DATABASE     �   CREATE DATABASE "WAD_Team_Retired" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 "   DROP DATABASE "WAD_Team_Retired";
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            �           0    0 
   SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    16391    Posts    TABLE     �   CREATE TABLE public."Posts" (
    "ID" bigint NOT NULL,
    "Title" text,
    "Text" text,
    "Date" date NOT NULL,
    "Likes" integer NOT NULL,
    "Author_ID" bigint NOT NULL
);
    DROP TABLE public."Posts";
       public         heap r       postgres    false    4            �            1259    16394    Posts_ID_seq    SEQUENCE     �   ALTER TABLE public."Posts" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Posts_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    218    4            �            1259    16388    Users    TABLE     �   CREATE TABLE public."Users" (
    "ID" bigint NOT NULL,
    "Username" character varying(50) NOT NULL,
    "Password" character varying(255) NOT NULL,
    "Email" character varying(255)
);
    DROP TABLE public."Users";
       public         heap r       postgres    false    4            �            1259    16400    Users_ID_seq    SEQUENCE     �   ALTER TABLE public."Users" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    217    4            �          0    16391    Posts 
   TABLE DATA           V   COPY public."Posts" ("ID", "Title", "Text", "Date", "Likes", "Author_ID") FROM stdin;
    public               postgres    false    218   w       �          0    16388    Users 
   TABLE DATA           H   COPY public."Users" ("ID", "Username", "Password", "Email") FROM stdin;
    public               postgres    false    217   �       �           0    0    Posts_ID_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Posts_ID_seq"', 4, true);
          public               postgres    false    219            �           0    0    Users_ID_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_ID_seq"', 1, true);
          public               postgres    false    220            '           2606    16407    Users PK 
   CONSTRAINT     L   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK" PRIMARY KEY ("ID");
 6   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "PK";
       public                 postgres    false    217            (           1259    16413    fki_PK_AUTHOR_ID    INDEX     M   CREATE INDEX "fki_PK_AUTHOR_ID" ON public."Posts" USING btree ("Author_ID");
 &   DROP INDEX public."fki_PK_AUTHOR_ID";
       public                 postgres    false    218            )           2606    16408    Posts PK_AUTHOR_ID 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "PK_AUTHOR_ID" FOREIGN KEY ("Author_ID") REFERENCES public."Users"("ID") NOT VALID;
 @   ALTER TABLE ONLY public."Posts" DROP CONSTRAINT "PK_AUTHOR_ID";
       public               postgres    false    217    4647    218            �   C   x�3�I-.Q�/.���,V �D��XPL!%�8�(��$3?�����D��H�МӀӐ+F��� ��g      �   &   x�3��MLIM-��+-)���,����T�=... �_
�     