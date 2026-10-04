import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Check, 
  Sparkles,
  Calendar,
  MapPin,
  Heart,
  CreditCard,
  Music,
  ImageIcon,
  UserCheck
} from 'lucide-react';
import { ClientInvitationData, TemplateId, OrderStatus } from '../../types/clientInvitation';
import { TEMPLATE_REGISTRY } from '../../admin/templateRegistry';
import { MediaSlotUploader } from './MediaSlotUploader';

interface ClientOrderEditorProps {
  initialData?: ClientInvitationData | null;
  onSave: (data: ClientInvitationData) => void;
  onCancel: () => void;
  onPreview: (data: ClientInvitationData) => void;
}

export const ClientOrderEditor: React.FC<ClientOrderEditorProps> = ({
  initialData,
  onSave,
  onCancel,
  onPreview
}) => {
  // Current active template
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(
    initialData?.templateId || 'ruang-rasa'
  );

  // Form State
  const [formData, setFormData] = useState<ClientInvitationData>(() => {
    if (initialData) return initialData;

    const templateDefaults = TEMPLATE_REGISTRY['ruang-rasa'].defaultData;
    return {
      id: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      clientName: 'Kirana & Adhitya',
      clientPhone: '081234567890',
      clientEmail: '',
      templateId: 'ruang-rasa',
      status: 'in_progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'kirana-adhitya',
      brideName: templateDefaults.brideName || 'Kirana',
      brideFullName: templateDefaults.brideFullName || 'Kirana Ayu Lestari, S.Ds.',
      brideParents: templateDefaults.brideParents || 'Putri pertama Bapak Hendra Wijaya & Ibu Sinta Maharani',
      brideInstagram: templateDefaults.brideInstagram || '@kiranaayuu',
      groomName: templateDefaults.groomName || 'Adhitya',
      groomFullName: templateDefaults.groomFullName || 'Adhitya Nugraha, B.Eng.',
      groomParents: templateDefaults.groomParents || 'Putra kedua Bapak Suryanto Nugraha & Ibu Ratna Dewi',
      groomInstagram: templateDefaults.groomInstagram || '@adhityanugraha',
      eventDateFormatted: templateDefaults.eventDateFormatted || 'Minggu, 14 Februari 2027',
      countdownIsoDate: templateDefaults.countdownIsoDate || '2027-02-14T08:00:00',
      akadTime: templateDefaults.akadTime || '08.00 – 09.30 WIB',
      akadVenue: templateDefaults.akadVenue || 'Ruang Bimasena, Aryaduta Hotel',
      resepsiTime: templateDefaults.resepsiTime || '11.00 – 14.00 WIB',
      resepsiVenue: templateDefaults.resepsiVenue || 'Grand Ballroom, Aryaduta Hotel',
      city: templateDefaults.city || 'Jakarta Selatan',
      mapsUrl: templateDefaults.mapsUrl || 'https://maps.google.com',
      quoteText: templateDefaults.quoteText || 'Dan di antara tanda-tanda kekuasaan-Nya...',
      quoteSource: templateDefaults.quoteSource || 'QS. Ar-Rum : 21',
      bankName: templateDefaults.bankName || 'BCA',
      accountNumber: templateDefaults.accountNumber || '8271029384',
      accountHolder: templateDefaults.accountHolder || 'Kirana Ayu Lestari',
      songTitle: templateDefaults.songTitle || 'Until I Found You - Stephen Sanchez',
      mediaSlots: {
        heroImage: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        bridePortrait: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
        galleryImages: [
          '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
          '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg'
        ]
      }
    };
  });

  const [activeTab, setActiveTab] = useState<'template' | 'client' | 'couple' | 'event' | 'media' | 'gift'>('template');
  const [saveToast, setSaveToast] = useState(false);

  // Template switch handler
  const handleTemplateChange = (newTemplateId: TemplateId) => {
    setSelectedTemplateId(newTemplateId);
    setFormData(prev => ({
      ...prev,
      templateId: newTemplateId
    }));
  };

  const handleFieldChange = (field: keyof ClientInvitationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMediaSlotChange = (slotKey: string, newValue: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      mediaSlots: {
        ...prev.mediaSlots,
        [slotKey]: newValue
      }
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave({
      ...formData,
      templateId: selectedTemplateId,
      updatedAt: new Date().toISOString()
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const activeTemplateDef = TEMPLATE_REGISTRY[selectedTemplateId];

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
            title="Kembali ke Daftar Pesanan"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-stone-900 tracking-tight">
              {initialData ? `Sunting Undangan: ${formData.clientName}` : 'Buat Undangan Klien Baru'}
            </h1>
            <p className="text-xs text-stone-500">
              ID: <span className="font-mono text-stone-700">{formData.id}</span> · Template:{' '}
              <span className="font-medium text-[#C5A880]">{activeTemplateDef.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1 font-medium animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan!</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => onPreview({ ...formData, templateId: selectedTemplateId })}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pratinjau Klien</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Undangan</span>
          </button>
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-200 text-xs font-medium scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('template')}
          className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'template' 
              ? 'bg-[#141413] text-white' 
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>1. Pilih Template</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('client')}
          className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'client' 
              ? 'bg-[#141413] text-white' 
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>2. Info Klien &amp; Status</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('couple')}
          className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'couple' 
              ? 'bg-[#141413] text-white' 
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>3. Profil Mempelai</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('event')}
          className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'event' 
              ? 'bg-[#141413] text-white' 
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>4. Waktu &amp; Lokasi Acara</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'media' 
              ? 'bg-[#141413] text-white' 
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>5. Upload Media &amp; Foto Template</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gift')}
          className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'gift' 
              ? 'bg-[#141413] text-white' 
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>6. Rekening &amp; Musik</span>
        </button>
      </div>

      {/* Tab 1: Template Picker */}
      {activeTab === 'template' && (
        <div className="space-y-4 text-left">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Pilih Desain Basis Undangan Klien
            </h2>
            <p className="text-xs text-stone-500">
              Setiap template memiliki struktur visual dan slot media yang telah dioptimalkan secara spesifik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(TEMPLATE_REGISTRY) as TemplateId[]).map(tId => {
              const item = TEMPLATE_REGISTRY[tId];
              const isSelected = selectedTemplateId === tId;

              return (
                <div
                  key={tId}
                  onClick={() => handleTemplateChange(tId)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-[#C5A880] bg-[#FAF7F2] shadow-sm' 
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 mb-3 border border-stone-200">
                    <img 
                      src={item.coverThumbnail} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A880]">
                        {item.styleLabel}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-[#C5A880] text-black px-1.5 py-0.5 rounded font-bold">
                          Aktif
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-stone-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Client Info & Order Status */}
      {activeTab === 'client' && (
        <div className="max-w-2xl text-left space-y-4">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Informasi Pemesan &amp; Status Pengerjaan
            </h2>
            <p className="text-xs text-stone-500">
              Data kontak klien dan tahapan status undangan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nama Pasangan / Judul Klien *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleFieldChange('clientName', e.target.value)}
                placeholder="Contoh: Kirana & Adhitya"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Status Undangan *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleFieldChange('status', e.target.value as OrderStatus)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              >
                <option value="pending">Draf Baru (Pending)</option>
                <option value="in_progress">Dalam Proses Desain</option>
                <option value="review">Review Klien</option>
                <option value="published">Siap Publikasi (Published)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nomor WhatsApp Klien
              </label>
              <input
                type="text"
                value={formData.clientPhone}
                onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
                placeholder="08123456789"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Klien (Opsional)
              </label>
              <input
                type="email"
                value={formData.clientEmail || ''}
                onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                placeholder="klien@gmail.com"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Couple Profiles */}
      {activeTab === 'couple' && (
        <div className="max-w-2xl text-left space-y-6">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Data Kedua Mempelai &amp; Keluarga
            </h2>
            <p className="text-xs text-stone-500">
              Informasi silsilah keluarga terhormat dan akun sosial media mempelai.
            </p>
          </div>

          {/* Mempelai Wanita */}
          <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
              DATA MEMPELAI WANITA (THE BRIDE)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Panggilan *
                </label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => handleFieldChange('brideName', e.target.value)}
                  placeholder="Contoh: Kirana"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Lengkap &amp; Gelar *
                </label>
                <input
                  type="text"
                  value={formData.brideFullName}
                  onChange={(e) => handleFieldChange('brideFullName', e.target.value)}
                  placeholder="Contoh: Kirana Ayu Lestari, S.Ds."
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Keterangan Orang Tua Mempelai Wanita
                </label>
                <input
                  type="text"
                  value={formData.brideParents}
                  onChange={(e) => handleFieldChange('brideParents', e.target.value)}
                  placeholder="Contoh: Putri pertama Bapak Hendra Wijaya & Ibu Sinta Maharani"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Username Instagram
                </label>
                <input
                  type="text"
                  value={formData.brideInstagram || ''}
                  onChange={(e) => handleFieldChange('brideInstagram', e.target.value)}
                  placeholder="@kiranaayuu"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          {/* Mempelai Pria */}
          <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
              DATA MEMPELAI PRIA (THE GROOM)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Panggilan *
                </label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => handleFieldChange('groomName', e.target.value)}
                  placeholder="Contoh: Adhitya"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Lengkap &amp; Gelar *
                </label>
                <input
                  type="text"
                  value={formData.groomFullName}
                  onChange={(e) => handleFieldChange('groomFullName', e.target.value)}
                  placeholder="Contoh: Adhitya Nugraha, B.Eng."
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Keterangan Orang Tua Mempelai Pria
                </label>
                <input
                  type="text"
                  value={formData.groomParents}
                  onChange={(e) => handleFieldChange('groomParents', e.target.value)}
                  placeholder="Contoh: Putra kedua Bapak Suryanto Nugraha & Ibu Ratna Dewi"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Username Instagram
                </label>
                <input
                  type="text"
                  value={formData.groomInstagram || ''}
                  onChange={(e) => handleFieldChange('groomInstagram', e.target.value)}
                  placeholder="@adhityanugraha"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Event Date & Location */}
      {activeTab === 'event' && (
        <div className="max-w-2xl text-left space-y-4">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Waktu, Lokasi &amp; Rangkaian Acara
            </h2>
            <p className="text-xs text-stone-500">
              Jadwal pelaksanaan akad, resepsi, dan titik lokasi peta Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tanggal Perayaan (Format Teks) *
              </label>
              <input
                type="text"
                value={formData.eventDateFormatted}
                onChange={(e) => handleFieldChange('eventDateFormatted', e.target.value)}
                placeholder="Contoh: Minggu, 14 Februari 2027"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Waktu Acara untuk Hitung Mundur (ISO Date) *
              </label>
              <input
                type="datetime-local"
                value={formData.countdownIsoDate.slice(0, 16)}
                onChange={(e) => handleFieldChange('countdownIsoDate', e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Waktu Akad Nikah
              </label>
              <input
                type="text"
                value={formData.akadTime}
                onChange={(e) => handleFieldChange('akadTime', e.target.value)}
                placeholder="08.00 – 09.30 WIB"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tempat / Ruangan Akad
              </label>
              <input
                type="text"
                value={formData.akadVenue}
                onChange={(e) => handleFieldChange('akadVenue', e.target.value)}
                placeholder="Ruang Bimasena, Aryaduta Hotel"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Waktu Resepsi Pernikahan
              </label>
              <input
                type="text"
                value={formData.resepsiTime}
                onChange={(e) => handleFieldChange('resepsiTime', e.target.value)}
                placeholder="11.00 – 14.00 WIB"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tempat / Gedung Resepsi
              </label>
              <input
                type="text"
                value={formData.resepsiVenue}
                onChange={(e) => handleFieldChange('resepsiVenue', e.target.value)}
                placeholder="Grand Ballroom, Aryaduta Hotel"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Kota / Wilayah
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                placeholder="Jakarta Selatan"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tautan Google Maps
              </label>
              <input
                type="url"
                value={formData.mapsUrl}
                onChange={(e) => handleFieldChange('mapsUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Template-Specific Media Uploader (NO rigid arbitrary global limit) */}
      {activeTab === 'media' && (
        <div className="max-w-3xl text-left space-y-6">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Slot Foto &amp; Media: {activeTemplateDef.name}
            </h2>
            <p className="text-xs text-stone-500">
              Unggah foto sesuai slot spesifik template. Untuk galeri dan klise film, Anda dapat mengunggah foto sebanyak yang diinginkan.
            </p>
          </div>

          <div className="space-y-4">
            {activeTemplateDef.mediaSlots.map(slot => (
              <MediaSlotUploader
                key={slot.key}
                slot={slot}
                value={(formData.mediaSlots as any)[slot.key]}
                onChange={(newVal) => handleMediaSlotChange(slot.key, newVal)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Gift & Music */}
      {activeTab === 'gift' && (
        <div className="max-w-2xl text-left space-y-4">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Tanda Kasih (Amplop Digital) &amp; Musik Latar
            </h2>
            <p className="text-xs text-stone-500">
              Konfigurasi rekening penerimaan tanda kasih dan lagu instrumen pengiring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nama Bank Utama
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleFieldChange('bankName', e.target.value)}
                placeholder="BCA"
                className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nomor Rekening
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
                placeholder="8271029384"
                className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Atas Nama (Pemilik)
              </label>
              <input
                type="text"
                value={formData.accountHolder}
                onChange={(e) => handleFieldChange('accountHolder', e.target.value)}
                placeholder="Kirana Ayu Lestari"
                className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Judul Lagu Latar
              </label>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#C5A880]" />
                <input
                  type="text"
                  value={formData.songTitle}
                  onChange={(e) => handleFieldChange('songTitle', e.target.value)}
                  placeholder="Until I Found You - Stephen Sanchez (Violin Solo)"
                  className="flex-1 p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Teks Kutipan / Doa Pembuka
              </label>
              <textarea
                rows={3}
                value={formData.quoteText}
                onChange={(e) => handleFieldChange('quoteText', e.target.value)}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Sticky Bar */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-600 hover:text-stone-900 font-medium transition-colors cursor-pointer"
        >
          Batalkan Perubahan
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onPreview({ ...formData, templateId: selectedTemplateId })}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pratinjau Klien</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Undangan</span>
          </button>
        </div>
      </div>

    </div>
  );
};
