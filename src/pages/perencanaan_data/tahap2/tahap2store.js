import { create } from "zustand";

const useStore = create((set) => ({
  selectedValue: 0,
  provincesOptions: [],
  initialValues: {
    materials: [],
    peralatans: [],
    tenagaKerjas: [],
  },
  dataMaterial: [],
  filteredDataMaterial: [],
  rowsToAdd: 0,
  isModalOpen: false,
  setSelectedValue: (value) => set({ selectedValue: value }),
  setProvincesOptions: (options) => set({ provincesOptions: options }),
  setInitialValues: (values) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        ...values,
      },
    })),
  setDataMaterial: (data) => set({ dataMaterial: data }),
  setFilteredDataMaterial: (data) => set({ filteredDataMaterial: data }),
  setRowsToAdd: (rows) => set({ rowsToAdd: rows }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  // Optimized push functions
  pushMaterial: (newMaterial) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        materials: [...state.initialValues.materials, newMaterial],
      },
    })),

  pushPeralatan: (newPeralatan) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        peralatans: [...state.initialValues.peralatans, newPeralatan],
      },
    })),

  pushTenagaKerja: (newTenagaKerja) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        tenagaKerjas: [...state.initialValues.tenagaKerjas, newTenagaKerja],
      },
    })),
}));

export default useStore;
