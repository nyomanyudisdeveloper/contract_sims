# API Contract SIMS PPOB

Adalah sebuah API yang secara garis besar untuk menghandle request untuk membuat membership, display information layanan, top up balance, and membuat transaksi. Project ini dibuat dengan tujuan untuk mengerjakan take home test. API ini hanya memiliki satu role yaitu member. API ini bisa di coba di [link](https://contract-sims.vercel.app/api-docs/). 

## Note Yang Perlu Diinfokan karena berbeda dengan contoh/ ketentuan
1. Jika saya melihat secara keseluruhan saya berasumsi bahwa di request login 'email' menjadi PRIMARY KEY (PK). Namun di project ini saya menjadikan seluruh table column id menjadi PK dan is_active. Tujuannya adalah agar di project ini tidak perlu menjalankan DELETE query, melainkan hanya perlu mengganti is_active = false. Hal ini bermanfaat agar record tidak hilang dan mencegah error jika mempunyai FOREGIN KEY(FK). Oleh karena itu saat request login, data yang ditambahkan dalam token jwt adalah membership id menggantikan email. Dan input service_code digantikan oleh service_id
2. Di request login, Saya tidak menambahkan validasi email dan password dikarenakan untuk fokus pada autentikasi, email sudah terverfikasi sebelumnya, fleksibilitas pengguna, dan pengalaman pengguna. Jadi di request ini hanya validasi apakah email dan password match dan terdaftar. 

## Status [Done]

### Method used 
- Express (Router)
- Middleware 
- Authentication
- Handle Request (GET, POST, PUT)
- Documentation 
- File Upload 

### Technologies 
- Javascript 
- Node JS
- PostgreSQL 
- Swagger 
- JWT
- Vercel 
- Superbase 
- Firebase Storage