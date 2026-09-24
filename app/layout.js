import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

export const metadata = {
    title: "Ella Simeon | Data Analyst & Data Science",
    description:
        "Portfolio of Ella Simeon, a data analyst and data science graduate student specializing in Power BI, SQL, Python, forecasting, and machine learning.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            data-theme="dark"
            suppressHydrationWarning
        >
            <body className={`${syne.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}