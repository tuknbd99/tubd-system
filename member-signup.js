
document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    member_code: generateMemberCode(),
    refer_code: document.getElementById("referCode").value.trim(),

    full_name: document.getElementById("fullName").value.trim(),
    father_name: document.getElementById("fatherName").value.trim(),
    mother_name: document.getElementById("motherName").value.trim(),

    id_type: document.querySelector('input[name="idType"]:checked')?.value || null,
    id_number: document.getElementById("idNumber").value.trim(),

    mobile: document.getElementById("mobile").value.trim(),
    telegram: document.getElementById("telegram").value.trim(),
    email: document.getElementById("email").value.trim(),
    dob: document.getElementById("dob").value || null,

    member_position: document.getElementById("memberPosition").value,

    student_class: document.getElementById("studentClass")?.value || null,
    student_madrasa: document.getElementById("studentMadrasa")?.value || null,
    student_address: document.getElementById("studentAddress")?.value || null,

    teacher_madrasa: document.getElementById("teacherMadrasa")?.value || null,
    khadim_mosque: document.getElementById("khadimMosque")?.value || null,
    other_description: document.getElementById("otherDescription")?.value || null,

    present_village: document.getElementById("presentVillage").value.trim(),
    present_post_office: document.getElementById("presentPostOffice").value.trim(),
    present_thana: document.getElementById("presentThana").value.trim(),
    present_division: document.getElementById("presentDivision").value,
    present_district: document.getElementById("presentDistrict").value,
    present_details: document.getElementById("presentDetails").value.trim(),

    permanent_village: document.getElementById("permanentVillage").value.trim(),
    permanent_post_office: document.getElementById("permanentPostOffice").value.trim(),
    permanent_thana: document.getElementById("permanentThana").value.trim(),
    permanent_division: document.getElementById("permanentDivision").value,
    permanent_district: document.getElementById("permanentDistrict").value,
    permanent_details: document.getElementById("permanentDetails").value.trim(),

    member_term: parseInt(document.getElementById("memberTerm").value),
    monthly_savings: parseFloat(document.getElementById("monthlySavings").value),

    profession: document.getElementById("profession").value.trim(),
    education: document.getElementById("education").value.trim(),

    nominee_name: document.getElementById("nomineeName").value.trim(),
    nominee_relation: document.getElementById("nomineeRelation").value
  };

  try {
    const { data: inserted, error } = await supabase
      .from("members")
      .insert([data])
      .select()
      .single();

    if (error) throw error;

    await createReferral(inserted.id, data.refer_code);
    await createMonthlySavings(inserted.id, data.monthly_savings);

    alert("সদস্য নিবন্ধন সফল");
    this.reset();

  } catch (err) {
    console.error(err);
    alert("ত্রুটি: " + err.message);
  }
});

function generateMemberCode() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return "TUKN-" + rand;
}

async function createReferral(memberId, referCode) {
  if (!referCode) return;

  await supabase.from("referrals").insert([
    {
      member_id: memberId,
      referred_by: referCode,
      level_no: 1
    }
  ]);
}

async function createMonthlySavings(memberId, amount) {
  const today = new Date();

  await supabase.from("member_savings").insert([
    {
      member_id: memberId,
      amount: amount,
      month_name: today.toLocaleString("default", { month: "long" }),
      year_no: today.getFullYear()
    }
  ]);
}
