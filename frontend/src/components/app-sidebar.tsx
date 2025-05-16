'use client'

import { queryClient } from "@/lib/react-query";
import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Spin, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Eye } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setSelectedFile(file);
        setFileURL(URL.createObjectURL(file));
      } else {
        alert("Formato de arquivo não suportado. Apenas PDF e DOCX são permitidos.");
      }
    }
  };

  const handleOpenModal = () => {
    if (fileURL) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar o arquivo");
      }

      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessonPlans"],
      });
    },
  });

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);


    await mutateAsync(formData)
  };

  return (
    <Sider width="25%" className="!bg-white px-12">
      <div className="space-y-2 mt-5">
        <Typography.Title level={4} className="!mb-0">Documento Original</Typography.Title>
        <Typography.Title level={5} className="!mb-0 !font-normal !text-sm">Faça upload do seu plano de aula existente</Typography.Title>
      </div>

      <div
        className="mt-5 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <p className="font-medium">Clique ou arraste um arquivo para esta área</p>
        <p className="text-sm text-gray-500 mt-1">Suporte para arquivos PDF e DOCX</p>
      </div>

      <input
        id="file-upload"
        type="file"
        accept=".pdf,.docx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {selectedFile && (
        <div className="mt-5">
          <p className="text-sm text-gray-700">Arquivo selecionado: {selectedFile.name}</p>
          <div className="flex flex-col gap-3 mt-3">
            <Button type="primary" onClick={handleOpenModal} icon={<Eye size={16} />}>
              Visualizar Documento
            </Button>
            <Button type="default" onClick={handleSubmit}>
              Enviar Documento {isPending && <Spin indicator={<LoadingOutlined spin />} size="small" />}
            </Button>
          </div>
        </div>
      )}

      <Modal
        title="Visualizar Documento"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="80%"
      >
        {fileURL && selectedFile?.type === "application/pdf" ? (
          <iframe
            src={fileURL}
            title="PDF Preview"
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        ) : (
          <p>Visualização de arquivos DOCX não suportada diretamente no navegador.</p>
        )}
      </Modal>
    </Sider>
  );
}