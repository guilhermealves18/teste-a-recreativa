import { AppContent } from "@/components/app-content";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Flex, Layout } from "antd";
import { Footer } from "antd/es/layout/layout";

export default function Home() {
  return (
    <Flex gap="middle" wrap>
      <Layout className="h-screen w-full overflow-hidden">
        <AppHeader />

        <Layout>
          <AppSidebar />
          
          <AppContent />
        </Layout>
        <Footer className="text-center !bg-white">
          copyright © {new Date().getFullYear()} - All rights reserved
        </Footer>
      </Layout>
    </Flex>
  );
}
