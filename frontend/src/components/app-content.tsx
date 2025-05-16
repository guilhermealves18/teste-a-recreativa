'use client';

import { queryClient } from '@/lib/react-query';
import type { LessonPlan } from '@/types/lesson-plan.type';
import { DeleteOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Modal, Spin, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { JSX } from 'react';
import { useState } from 'react';

async function fetchLessonPlans() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/lesson-plan`);
  if (!response.ok) {
    throw new Error('Erro ao buscar planos de aula');
  }
  const result = await response.json();
  return result.data;
}

export function AppContent() {
  const { data: lessonPlans, isLoading, error } = useQuery({
    queryKey: ['lessonPlans'],
    queryFn: fetchLessonPlans,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [form] = Form.useForm();

  const dataSource = lessonPlans?.map((plan: LessonPlan) => ({
    key: plan.id,
    id: plan.id,
    title: plan.title,
    uploadedFilePath: plan.uploadedFilePath,
    objectives: plan.Objectives?.length || 0,
    activities: plan.Activities?.length || 0,
    evaluations: plan.Evaluations?.length || 0,
  })) || [];

  interface DataSource {
    key: string;
    id: string;
    title: string;
    uploadedFilePath: string;
    objectives: number;
    activities: number;
    evaluations: number;
  }

  const handleViewUploaded = (record: LessonPlan) => {
    const pdfPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${record.uploadedFilePath}`;
    setPdfUrl(pdfPath);
    setIsModalOpen(true);
  };

  const handleViewGenerated = (record: LessonPlan) => {
    const pdfPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/generated-${record.id}.pdf`;
    setPdfUrl(pdfPath);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPdfUrl(null);
  };

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    form.resetFields();
  };

  const {mutateAsync: createLessonPlanManually, isPending: isPendingCreateLessonPlan} = useMutation({
    mutationKey: ['create-lessonPlans'],
    mutationFn: async (lessonPlan: LessonPlan) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonPlan),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar o plano de aula');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lessonPlans'],
      })
    }
  })

  const handleFormSubmit = async (values: LessonPlan) => {
    await createLessonPlanManually(values)

    handleCloseFormModal()
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-lessonPlans'],
    mutationFn: async (lessonPlanId: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson-plan/${lessonPlanId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir o plano de aula');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessonPlans"],
      })
    },
  })

  const handleDelete = async (record: LessonPlan) => {
    try {
      await mutateAsync(String(record.id))
    } catch (error) {
      console.error('Erro ao excluir o plano de aula:', error);
    }
  };

  const columns: Array<{
    title: string;
    dataIndex?: keyof DataSource;
    key: string;
    render?: (_: unknown, record: LessonPlan) => JSX.Element;
  }> = [
      {
        title: 'Plano de Aula',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Arquivo enviado',
        dataIndex: 'uploadedFilePath',
        key: 'uploadedFilePath',
        render: (_, record) => (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewUploaded(record)}
          />
        ),
      },
      {
        title: 'Objetivos',
        dataIndex: 'objectives',
        key: 'objectives',
      },
      {
        title: 'Atividades',
        dataIndex: 'activities',
        key: 'activities',
      },
      {
        title: 'Avaliações',
        dataIndex: 'evaluations',
        key: 'evaluations',
      },
      {
        title: 'Ações',
        key: 'actions',
        render: (_, record) => (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleViewGenerated(record)}
            >
              Visualizar
            </Button>
            <Button
              type="default"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            >
              Excluir {isPending && <Spin indicator={<LoadingOutlined spin />} size="small" />}
            </Button>
          </div>
        ),
      },
    ];

  if (isLoading) {
    return <Content className="h-screen !bg-background p-6">Carregando...</Content>;
  }

  if (error) {
    return (
      <Content className="h-screen !bg-background p-6">
        Erro ao carregar os dados: {(error as Error).message}
      </Content>
    );
  }

  return (
    <Content className="h-screen !bg-background p-6">
      <Button type="primary" onClick={handleOpenFormModal} style={{ marginBottom: '16px' }}>
        Adicionar Plano de Aula
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Visualizar Documento"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="80%"
      >
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        )}
      </Modal>
      <Modal
        title="Adicionar Plano de Aula"
        open={isFormModalOpen}
        onCancel={handleCloseFormModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Título"
            name="title"
            rules={[{ required: true, message: 'Por favor, insira o título do plano de aula!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Objetivos"
            name="objectives"
            rules={[{ required: true, message: 'Por favor, insira os objetivos!' }]}
            extra="Os objetivos podem ser separados por vírgula (,), ponto e vírgula (;) ou quebra de linha."
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Atividades"
            name="activities"
            rules={[{ required: true, message: 'Por favor, insira as atividades!' }]}
            extra="As atividades podem ser separadas por vírgula (,), ponto e vírgula (;) ou quebra de linha."
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Avaliação"
            name="evaluation"
            rules={[{ required: true, message: 'Por favor, insira a avaliação!' }]}
            extra="A avaliação pode ser separada por vírgula (,), ponto e vírgula (;) ou quebra de linha."
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar {isPendingCreateLessonPlan && <Spin indicator={<LoadingOutlined spin />} size="small" />}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}