import Seasons from '@/components/Seasons';

export default function Home() {
    return (
        <main>
            <Seasons endpoint="/api/seasons" />
        </main>
    );
}
