import { useEffect, useState } from "react";
import Navbar from "../../../components/navigationbar";
import TextInput from "../../../components/input";
import entri_dataStore from "./entri_data/entri_data";
import informasi_tahap_pengumpulanStore from "../pengawas/informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import Datepicker from "../../../components/datepicker";

export default function EntriData() {
  const { dataEntri, fetchData } = entri_dataStore();
  const [date, setDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleDateChange = (newDate) => {
    if (!newDate) {
      setError(true);
      setHelperText("Tanggal harus diisi");
    } else {
      setError(false);
      setHelperText("");
    }
    setDate(newDate);
  };

  useEffect(() => {
    fetchData(50);
  }, [fetchData]);

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <div style={{ padding: "20px" }}>
          <h3>Pilih Tanggal</h3>
          <CustomDatePicker
            label="Pilih Tanggal"
            value={date}
            onChange={handleDateChange}
            error={error}
            helperText={helperText}
          />
        </div>
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Entri Data Hasil Pengumpulan Kuesioner dari HSP
        </h3>
        <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
          Blok I: Keterangan Tempat
        </h4>
      </div>
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <TextInput
          label="Provinsi"
          labelPosition="left"
          placeholder="Masukkan Provinsi"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.provinsi || ""}
        />
        <TextInput
          label="Kabupaten/Kota"
          labelPosition="left"
          placeholder="Masukkan Kabupaten/Kota"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.kota || ""}
        />
        <TextInput
          label="Nama Responden/Vendor"
          labelPosition="left"
          placeholder="Masukkan Nama Responden/Vendor"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.nama_responden || ""}
        />
        <TextInput
          label="Alamat Responden/Vendor/ Geo-tagging"
          labelPosition="left"
          placeholder="Masukkan Alamat"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.alamat || ""}
        />
        <TextInput
          label="Nomor Telepon/HP /E-mail"
          labelPosition="left"
          placeholder="Masukkan Nomor Kontak"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.no_telepon || ""}
        />
        <TextInput
          label="Kategori Responden /Vendor"
          labelPosition="left"
          placeholder="Masukkan Kategori"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.kategori_responden || ""}
        />
      </div>
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok II: Keterangan Petugas Lapangan
      </h4>
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <TextInput
          label="Nama Petugas Lapangan"
          labelPosition="left"
          placeholder="Masukkan Nama Petugas Lapangan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama petugas lapangan tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="NIP Petugas Lapangan"
          labelPosition="left"
          placeholder="Masukkan NIP Lapangan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama tim tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="Tanggal Survei"
          labelPosition="left"
          placeholder="Masukkan Tanggal Survei"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Tanggal survei tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="Nama Pengawas"
          labelPosition="left"
          placeholder="Masukkan Nama Pengawas"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama pengawas tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="NIP Pengawas"
          labelPosition="left"
          placeholder="Masukkan NIP"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="NIP tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="Tanggal Pengawasan"
          labelPosition="left"
          placeholder="Masukkan Tanggal Pengawasan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Tanggal pengawasan tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
      </div>
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok III: Keterangan Pemberi Informasi
      </h4>
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <TextInput
          label="Nama Pemberi Informasi/Jabatan"
          labelPosition="left"
          placeholder="Masukkan Nama Pemberi Informasi/Jabatan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama pemberi/informasi tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="Tanggal Survei"
          labelPosition="left"
          placeholder="Masukkan Tanggal Survei"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Tanggal survei tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
      </div>
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok IV: Keterangan Pemberi Informasi
      </h4>
      <div className="rounded-[16px] border border-surface-light-outline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-max">
            <thead>
              <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                <th className="px-3 py-6 text-sm text-center w-[52px]">No</th>
                <th className="px-3 py-6 text-sm w-[280px]">Nama Paket</th>
                <th className="px-3 py-6 text-sm w-[280px]">Nama Balai</th>
                <th className="px-3 py-6 text-sm w-[200px]">Nama PPK</th>
                <th className="px-3 py-6 text-sm w-[200px]">Jabatan PPK</th>
                <th className="px-3 py-6 text-sm w-[140px]">Kode Rup</th>
                <th className="px-3 py-6 text-sm w-[280px]">Status</th>
                <th className="px-3 py-6 text-sm w-[52px] text-center relative">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
