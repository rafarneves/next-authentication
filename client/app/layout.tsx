import Navbar from "../components/navbar"
import { AuthProvider } from "../context/AuthContext"
import './global.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Navbar />
                    <div className="container">
                        {children}
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}