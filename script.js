// Batasi NISN maksimal 10 digit
function batasinisn(input) {
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

// Batasi No HP hanya angka dan maksimal 13 digit
function batasino(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 13) {
        input.value = input.value.slice(0, 13);
    }
}

function batasidesimal(input) {
    let angka = input.value.split(".");

    if (angka[1]) {
        angka[1] = angka[1].slice(0, 2);
        input.value = angka[0] + "." + angka[1];
    }
}

// Proses data saat form disubmit
function disimpandulu(event) {
    event.preventDefault();

    // Ambil nilai dari form
    const data = {
        nisn: document.getElementById('nisn').value,
        nama: document.getElementById('nm').value,
        tempatLahir: document.getElementById('tl').value,
        tanggalLahir: document.getElementById('tr').value,
        gender: document.querySelector('input[name="jk"]:checked').value,
        berat: document.getElementById('bb').value,
        tinggi: document.getElementById('tb').value,
        agama: document.getElementById('agm').value,
        jurusan: document.getElementById('jrsn').value,
        noHp: document.getElementById('no').value,
        alamat: document.getElementById('almt').value,
        email: document.getElementById('eml').value,
        password: '•'.repeat(document.getElementById('pw').value.length)
    };

    // Ambil hobi yang dicentang
    let hobiArr = [];
    document.querySelectorAll('input[name="hobi"]:checked').forEach(cb => hobiArr.push(cb.value));
    data.hobi = hobiArr.length > 0 ? hobiArr.join(', ') : 'Tidak ada';

    // Cek dan baca file foto
    const fotoFile = document.getElementById('foto').files[0];
    if (fotoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            tampilkanHasil(data, e.target.result);
        };
        reader.readAsDataURL(fotoFile);
    } else {
        tampilkanHasil(data, '');
    }
}

// Tampilkan hasil ke dalam bentuk tabel
function tampilkanHasil(d, fotoSrc) {
    const container = document.querySelector('.form-container');
    
    container.innerHTML = `
        <h2>Data Berhasil Disimpan</h2>
        <table class="result-table">
            <tr>
                <th>Foto</th>
                <td>${fotoSrc ? `<img src="${fotoSrc}" style="width: 80px; height: 100px; object-fit: cover; border-radius: 4px;">` : 'Tidak ada foto'}</td>
            </tr>
            <tr><th>NISN</th><td>${d.nisn}</td></tr>
            <tr><th>Nama</th><td>${d.nama}</td></tr>
            <tr><th>Tempat, Tanggal Lahir</th><td>${d.tempatLahir}, ${d.tanggalLahir}</td></tr>
            <tr><th>Jenis Kelamin</th><td>${d.gender}</td></tr>
            <tr><th>Berat Badan</th><td>${d.berat ? d.berat + ' kg' : '-'}</td></tr>
            <tr><th>Tinggi Badan</th><td>${d.tinggi ? d.tinggi + ' cm' : '-'}</td></tr>
            <tr><th>Agama</th><td>${d.agama}</td></tr>
            <tr><th>Jurusan</th><td>${d.jurusan}</td></tr>
            <tr><th>No. HP</th><td>${d.noHp}</td></tr>
            <tr><th>Alamat</th><td>${d.alamat}</td></tr>
            <tr><th>Hobi</th><td>${d.hobi}</td></tr>
            <tr><th>Email</th><td>${d.email}</td></tr>
            <tr><th>Password</th><td>${d.password}</td></tr>
        </table>
        <button onclick="location.reload()" class="btn-submit">Kembali ke Form</button>
    `;
}