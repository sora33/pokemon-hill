-- セミナーファイル用のストレージバケットを作成
insert into storage.buckets (id, name, public)
values ('public-storage', 'public-storage', true);

-- バケットのセキュリティ設定
create policy "作成は認証済みユーザーのみ可能"
  on storage.objects for insert
  with check (bucket_id = 'public-storage' and auth.role() = 'authenticated');

create policy "読み取りは全員可能"
  on storage.objects for select
  using (bucket_id = 'public-storage');

create policy "更新は認証済みユーザーのみ可能"
  on storage.objects for update
  using (bucket_id = 'public-storage' and auth.role() = 'authenticated');

create policy "削除は認証済みユーザーのみ可能"
  on storage.objects for delete
  using (bucket_id = 'public-storage' and auth.role() = 'authenticated');
