import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const { i18n } = useTranslation();

  const messages = {
    ky: 'Саламатсызбы! Курстар жөнүндө маалымат алгым келет.',
    ru: 'Здравствуйте! Хочу узнать о курсах.',
    en: 'Hello! I would like to learn about courses.',
  };

  const lang = i18n.language?.substring(0, 2) || 'ky';
  const message = messages[lang] || messages.ky;

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        WhatsApp
      </span>
    </a>
  );
}
