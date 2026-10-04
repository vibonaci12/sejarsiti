import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { ClientInvitationData } from '../../types/clientInvitation';
import { AdminStore } from '../../admin/adminStore';

interface GuestLinkModalProps {
  invitation: ClientInvitationData;
  onClose: () => void;
}

export const GuestLinkModal: React.FC<GuestLinkModalProps> = ({
  invitation,
  onClose
}) => {
  const [guestNameInput, setGuestNameInput] = useState('Bpk. Hendra Wijaya & Keluarga');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const generatedLink = AdminStore.generateShareLink(invitation, guestNameInput.trim());

  const whatsappMessageTemplate = `Kepada Yth.
${guestNameInput.trim() || 'Bapak/Ibu/Saudara/i'},

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Anda untuk hadir pada perayaan pernikahan kami:

${invitation.brideName} & ${invitation.groomName}
Hari/Tanggal: ${invitation.eventDateFormatted}
Tempat: ${invitation.resepsiVenue}, ${invitation.city}

Tautan Undangan Resmi Digital Anda:
${generatedLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Hormat kami yang berbahagia,
${invitation.brideName} & ${invitation.groomName}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(whatsappMessageTemplate);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessageTemplate);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5E0D8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]">
          <div>
            <h3 className="text-sm font-bold text-[#141413]">
              Generator Tautan Tamu Undangan
            </h3>
            <p className="text-xs text-[#7A756D]">
              Klien: <span className="font-semibold text-[#141413]">{invitation.clientName}</span> ({invitation.id})
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-left text-xs">
          
          {/* Guest Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#141413]">
              Nama Tamu yang Dituju (Personalisasi URL ?to=)
            </label>
            <input 
              type="text" 
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              placeholder="Contoh: Bpk. Ahmad Dahlan & Keluarga"
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5D0C6] rounded-xl text-xs text-[#141413] focus:outline-none focus:border-[#C5A880]"
            />
            <p className="text-[11px] text-[#7A756D]">
              Nama tamu ini akan tercetak otomatis pada sampul dan sambutan undangan klien.
            </p>
          </div>

          {/* Generated URL Result */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#141413]">
              Tautan Undangan Khusus
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly
                value={generatedLink}
                className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700 select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-2.5 bg-[#141413] hover:bg-stone-800 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tersalin' : 'Salin URL'}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Text Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#141413]">
                Pratinjau Pesan WhatsApp Otomatis
              </label>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] text-[#C5A880] hover:text-[#9A7D55] font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedMessage ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMessage ? 'Teks Tersalin!' : 'Salin Seluruh Teks'}</span>
              </button>
            </div>

            <textarea 
              readOnly
              rows={7}
              value={whatsappMessageTemplate}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl text-xs text-[#242321] leading-relaxed font-sans resize-none select-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka di WhatsApp Web / App</span>
            </button>

            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Tautan</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
