
document.getElementById("memberLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginInput = document.getElementById("loginInput").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await supabase
    .from("member_accounts")
    .select("id, member_id, password_hash, role")
    .or(`login_mobile.eq.${loginInput},member_code.eq.${loginInput}`)
    .single();

  if (error || !data) {
    alert("অ্যাকাউন্ট পাওয়া যায়নি");
    return;
  }

  if (data.password_hash !== password) {
    alert("পাসওয়ার্ড ভুল");
    return;
  }

  localStorage.setItem("member_session", JSON.stringify(data));

  await supabase
    .from("member_accounts")
    .update({ last_login: new Date().toISOString() })
    .eq("id", data.id);

  window.location.href = "member-dashboard.html";
});
