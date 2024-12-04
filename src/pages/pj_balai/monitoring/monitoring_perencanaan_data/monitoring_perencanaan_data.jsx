// import { Field, FieldArray, Form, Formik } from "formik";

// export default function PenugasanTim() {
//   const initialValues = {
//     materials: [
//       {
//         nama_material: "",
//         satuan: "",
//         spesifikasi: "",
//         ukuran: "",
//         kodefikasi: "",
//         kelompok_material: "",
//         jumlah_kebutuhan: "",
//         merk: "",
//         provinsi: "",
//         kota: "",
//       },
//     ],
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={(values) => {
//         console.log(values);
//       }}>
//       {({ values, setFieldValue }) => (
//         <Form>
//           <perencanaandataForm
//             values={values}
//             setFieldValue={setFieldValue}
//             hide={selectedValue !== 0}
//             provincesOptions={provincesOptions}
//             kelompokMaterialOptions={kelompokMaterialOptions}
//           />
//           {/* <table className="table-auto w-full min-w-max border-collapse border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="px-4 py-2 border-b border-gray-300">
//                   Nama Material
//                 </th>
//                 <th className="px-4 py-2 border-b border-gray-300">Satuan</th>
//                 <th className="px-4 py-2 border-b border-gray-300">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <FieldArray
//                 name="materials"
//                 render={(arrayHelpers) => (
//                   <>
//                     {values.materials.map((_, index) => (
//                       <tr key={index} className="odd:bg-white even:bg-gray-50">
//                         <td className="px-4 py-2 border-b border-gray-300">
//                           <Field
//                             name={`materials.${index}.nama_material`}
//                             placeholder="Nama Material"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                           />
//                         </td>
//                         <td className="px-4 py-2 border-b border-gray-300">
//                           <Field
//                             name={`materials.${index}.satuan`}
//                             placeholder="Satuan"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                           />
//                         </td>
//                         <td className="px-4 py-2 border-b border-gray-300 text-center">
//                           <button
//                             type="button"
//                             onClick={() => arrayHelpers.remove(index)}
//                             className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white">
//                             Hapus
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     <tr>
//                       <td colSpan="3" className="text-center py-4">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             arrayHelpers.push({
//                               nama_material: "",
//                               satuan: "",
//                               spesifikasi: "",
//                               ukuran: "",
//                               kodefikasi: "",
//                               kelompok_material: "",
//                               jumlah_kebutuhan: "",
//                               merk: "",
//                               provinsi: "",
//                               kota: "",
//                             })
//                           }
//                           className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
//                           Tambah Material
//                         </button>
//                       </td>
//                     </tr>
//                   </>
//                 )}
//               />
//             </tbody>
//           </table>
//           <div className="mt-4 text-right">
//             <button
//               type="submit"
//               className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700">
//               Simpan
//             </button>
//           </div> */}
//         </Form>
//       )}
//     </Formik>
//   );
// }
