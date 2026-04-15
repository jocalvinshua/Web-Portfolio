export default function Footer() {
    return (
        <div className="mt-20">
            <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-3">
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com"></a>. All rights reserved.</p>
            </div>
        </div>
    )
}