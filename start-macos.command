#!/bin/bash

# Pindah ke direktori tempat file ini berada
cd "$(dirname "$0")"

echo "========================================="
echo "   Menjalankan Aplikasi Zidan Sport..."
echo "========================================="

# Mengecek apakah node_modules sudah ada, jika belum otomatis install
if [ ! -d "node_modules" ]; then
  echo "Menemukan bahwa library belum di-install."
  echo "Meng-install library yang dibutuhkan (npm install)..."
  npm install
fi

# Menjalankan aplikasi
echo "Menjalankan npm start..."
npm start
