interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="max-w-7xl mx-auto p-4 min-h-screen">
            {children}
        </div>
    )
}