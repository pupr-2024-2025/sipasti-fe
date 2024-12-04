import { create } from "zustand";

const useStore = create((set) => ({
  selectedValue: 0,
  provincesOptions: [],
  initialValues: {
    materials: [
      // {
      //   nama_material: "",
      //   satuan: "",
      //   spesifikasi: "",
      //   ukuran: "",
      //   kodefikasi: "",
      //   kelompok_material: "",
      //   jumlah_kebutuhan: 0,
      //   merk: "",
      //   provincies_id: 0,
      //   cities_id: 0,
      // },
    ],
    peralatans: [
      {
        nama_peralatan: "",
        satuan: "",
        spesifikasi: "",
        kapasitas: "",
        kodefikasi: "",
        kelompok_peralatan: "",
        jumlah_kebutuhan: 0,
        merk: "",
        provincies_id: 0,
        cities_id: 0,
      },
    ],
    tenagaKerjas: [
      {
        jenis_tenaga_kerja: "",
        satuan: "",
        jumlah_kebutuhan: 0,
        kodefikasi: "",
        provincies_id: 0,
        cities_id: 0,
      },
    ],
  },
  setSelectedValue: (value) => set({ selectedValue: value }),
  setProvincesOptions: (options) => set({ provincesOptions: options }),
  setCitiesOptions: (options) => set({ citiesOptions: options }),
  setInitialValues: (values) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        ...values,
      },
    })),
}));

export default useStore;
