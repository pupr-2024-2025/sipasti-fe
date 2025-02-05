import { ClipboardText } from "iconsax-react";
import TextInput from "../../../components/input";
import colors from "../../../styles/colors";
import React, { useEffect, useState } from "react";
import usePengumpulanInformasiStore from "../../../store/pengumpulanInformasiStore";
import CustomAlert from "../../../components/alert";

const LinkKuesioner = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertOpen, setAlertOpen] = useState(false);

  const { urlKuisionerResult, dateExpired, openGenerateLinkModal } =
    usePengumpulanInformasiStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("selectedIdLinkKuesioner");
    console.log("Stored ID:", storedId);

    if (storedId && typeof openGenerateLinkModal === "function") {
      setLoading(true);
      openGenerateLinkModal(storedId).finally(() => {
        setLoading(false);
      });
    }
  }, [openGenerateLinkModal]);

  const handleCopyLink = () => {
    if (urlKuisionerResult) {
      const linkToCopy = `${
        window.location.origin
      }/pengumpulan_data/survei_kuesioner/${
        urlKuisionerResult.split("token=")[1]
      }`;

      navigator.clipboard
        .writeText(linkToCopy)
        .then(() => {
          // On success
          setAlertMessage("Link berhasil disalin ke clipboard!");
          setAlertSeverity("success");
          setAlertOpen(true);
        })
        .catch(() => {
          // On failure
          setAlertMessage("Gagal menyalin link.");
          setAlertSeverity("error");
          setAlertOpen(true);
        });
    }
  };

  return (
    <div className="pl-4 pr-4 pb-4">
      <div className="flex items-end gap-4">
        <TextInput
          label="Link"
          labelPosition="top"
          placeholder={loading ? "Memuat..." : "Link tidak ditemukan"}
          size="Medium"
          value={
            urlKuisionerResult
              ? `${window.location.origin}/pengumpulan_data/survei_kuesioner/${
                  urlKuisionerResult.split("token=")[1]
                }`
              : "Sedang memuat link..."
          }
          labelWidth="100px"
          disabledActive={true}
          className="flex-1"
        />
        <button
          className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-colors 
            hover:bg-custom-blue-50 cursor-pointer border-2 border-surface-light-outline outline-none focus:outline-custom-blue-500`}
          onClick={handleCopyLink}>
          <ClipboardText
            size="24"
            color={colors.Emphasis.Light.On_Surface.High}
          />
        </button>
      </div>

      <div className="text-small text-custom-red-500 mt-2">
        <div>
          {dateExpired
            ? `Link berlaku hingga: ${dateExpired}`
            : loading
            ? "Memuat tanggal expired..."
            : "Tanggal expired tidak tersedia."}
        </div>
      </div>
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        openInitially={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default LinkKuesioner;
