// components/footer/Footer.tsx

export default function Footer() {
  return (
    <footer className="border-t bg-white px-6 py-4 text-center">
      <p>
        © {new Date().getFullYear()} Project. All rights reserved.
      </p>
    </footer>
  );
}