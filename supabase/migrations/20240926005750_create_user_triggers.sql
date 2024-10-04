-- トリガー関数の作成
create or replace function public.handle_user_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.user (
      id, name, email, created_at, updated_at
    )
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'name', ''),
      new.email,
      now(),
      now()
    );
  elsif (tg_op = 'UPDATE') then
    update public.user
    set
      email = new.email,
      name = coalesce(new.raw_user_meta_data->>'name', name),
      updated_at = now()
    where id = new.id;
  end if;
  return new;
end;
$$;

comment on function public.handle_user_changes() is 'auth.usersテーブルの変更をpublic.userテーブルに反映するトリガー関数';

-- 新規ユーザー作成時のトリガー
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_user_changes();

-- ユーザーメタデータ更新時のトリガー
create trigger on_auth_user_updated
  after update of raw_user_meta_data, raw_app_meta_data, email on auth.users
  for each row
  when (
    old.raw_user_meta_data is distinct from new.raw_user_meta_data or
    old.raw_app_meta_data is distinct from new.raw_app_meta_data or
    old.email is distinct from new.email
  )
  execute function public.handle_user_changes();
