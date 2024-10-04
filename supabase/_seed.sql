-- デフォルトユーザーの作成
with credentials(id, email, password, name) as (
  select * from (values
    (gen_random_uuid(), 'admin@example.com', 'Admin1234', '管理者')
  ) as users(id, email, password, name)
),
create_user as (
  insert into auth.users (
    id, instance_id, role, aud, email,
    raw_app_meta_data, raw_user_meta_data,
    is_super_admin, encrypted_password,
    created_at, updated_at, last_sign_in_at,
    email_confirmed_at, confirmation_sent_at,
    confirmation_token, recovery_token,
    email_change_token_new, email_change
  )
  select
    id::uuid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    email,
    '{"provider":"email","providers":["email"], "role": "admin"}'::jsonb,
    jsonb_build_object('name', name),
    false,
    crypt(password, gen_salt('bf')),
    now(), now(), now(), now(), now(),
    '', '', '', ''
  from credentials
  returning id
),
-- デフォルトユーザーの認証情報を作成
create_identity as (
  insert into auth.identities (
    id, provider_id, user_id, identity_data,
    provider, last_sign_in_at, created_at, updated_at
  )
  select
    gen_random_uuid(),
    id,
    id,
    jsonb_build_object('sub', id::text),
    'email',
    now(), now(), now()
  from create_user
  returning user_id
)
-- メインのSELECTステートメントを追加
select * from create_identity;
