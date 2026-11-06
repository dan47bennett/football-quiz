import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MongoDB Next.js App',
    description: 'A Next.js application with MongoDB integration',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
