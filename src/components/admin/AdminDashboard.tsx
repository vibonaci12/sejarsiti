import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Edit2, 
  Copy, 
  Trash2, 
  Share2, 
  Eye, 
  ArrowLeft,
  LayoutDashboard,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  Send
} from 'lucide-react';
import { ClientInvitationData, OrderStatus } from '../../types/clientInvitation';
import { AdminStore } from '../../admin/adminStore';
import { TEMPLATE_REGISTRY } from '../../admin/templateRegistry';
import { ClientOrderEditor } from './ClientOrderEditor';
import { GuestLinkModal } from './GuestLinkModal';

interface AdminDashboardProps {
  onBackToLanding: () => void;
  onPreviewClientInvitation: (invitation: ClientInvitationData) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToLanding,
  onPreviewClientInvitation
}) => {
  const [orders, setOrders] = useState<ClientInvitationData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [templateFilter, setTemplateFilter] = useState<string>('all');

  // Active view: 'list' | 'create' | 'edit'
  const [viewState, setViewState] = useState<'list' | 'create' | 'edit'>('list');
  const [editingOrder, setEditingOrder] = useState<ClientInvitationData | null>(null);

  // Guest link generator modal
  const [guestLinkOrder, setGuestLinkOrder] = useState<ClientInvitationData | null>(null);

  const refreshOrders = () => {
    setOrders(AdminStore.getAll());
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const handleCreateNew = () => {
    setEditingOrder(null);
    setViewState('create');
  };

  const handleEdit = (order: ClientInvitationData) => {
    setEditingOrder(order);
    setViewState('edit');
  };

  const handleSaveOrder = (data: ClientInvitationData) => {
    if (viewState === 'create') {
      AdminStore.create(data);
    } else {
      AdminStore.update(data.id, data);
    }
    refreshOrders();
    setViewState('list');
    setEditingOrder(null);
  };

  const handleDelete = (id: string, clientName: string) => {
    if (window.confirm(`Yakin ingin menghapus undangan "${clientName}"?`)) {
      AdminStore.delete(id);
      refreshOrders();
    }
  };

  const handleDuplicate = (id: string) => {
    AdminStore.duplicate(id);
    refreshOrders();
  };

  // Filtered orders
  const filteredOrders = orders.filter(item => {
    const matchesSearch = 
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientPhone.includes(searchQuery) ||
      item.brideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.groomName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesTemplate = templateFilter === 'all' || item.templateId === templateFilter;

    return matchesSearch && matchesStatus && matchesTemplate;
  });

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-stone-900 font-['Plus_Jakarta_Sans',sans-serif] flex">
      
      {/* ============================================================
          SIDEBAR NAVIGATION (260px SaaS Enterprise Standard)
          ============================================================ */}
      <aside className="w-64 bg-[#141413] text-stone-300 flex flex-col shrink-0 border-r border-[#262522]">
        
        {/* Brand Lockup */}
        <div className="p-5 border-b border-[#262522] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
            <span className="font-['Fraunces',serif] text-base text-white tracking-wide">
              Sekarsiti Studio
            </span>
          </div>
          <p className="text-[10px] text-[#A8A39A] uppercase tracking-widest font-mono">
            Admin Workspace &amp; Client Generator
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 text-xs font-medium flex-1">
          <button
            onClick={() => setViewState('list')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              viewState === 'list' 
                ? 'bg-[#22211E] text-[#C5A880] font-semibold' 
                : 'text-stone-400 hover:text-white hover:bg-[#1A1918]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Daftar Undangan Klien</span>
            </div>
            <span className="font-mono text-[10px] bg-[#141413] border border-[#2E2C28] px-2 py-0.5 rounded text-stone-300">
              {orders.length}
            </span>
          </button>

          <button
            onClick={handleCreateNew}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              viewState === 'create' 
                ? 'bg-[#22211E] text-[#C5A880] font-semibold' 
                : 'text-stone-400 hover:text-white hover:bg-[#1A1918]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#C5A880]" />
            <span>Buat Undangan Baru</span>
          </button>
        </nav>

        {/* Bottom Back Button */}
        <div className="p-4 border-t border-[#262522]">
          <button
            onClick={onBackToLanding}
            className="w-full py-2 px-3 bg-[#1A1918] hover:bg-[#262522] text-stone-300 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Kembali ke Website Utama</span>
          </button>
        </div>
      </aside>

      {/* ============================================================
          MAIN WORKSPACE AREA
          ============================================================ */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header & Breadcrumb Ribbon */}
        <header className="bg-white border-b border-stone-200 px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Workspace</span>
            <span>/</span>
            <span>Undangan Klien</span>
            {viewState !== 'list' && (
              <>
                <span>/</span>
                <span className="font-semibold text-stone-900">
                  {viewState === 'create' ? 'Buat Undangan Baru' : 'Sunting Undangan'}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {viewState === 'list' && (
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Undangan Klien Baru</span>
              </button>
            )}
          </div>
        </header>

        {/* View Switch: Table List vs Form Editor */}
        <div className="p-8 flex-1">
          {viewState === 'list' ? (
            <div className="space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Cari nama klien, ID, mempelai, atau no. telepon..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Filter className="w-3.5 h-3.5 text-stone-400" />
                    <span>Status:</span>
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="all">Semua Status ({orders.length})</option>
                    <option value="pending">Draf Baru</option>
                    <option value="in_progress">Dalam Proses</option>
                    <option value="review">Review</option>
                    <option value="published">Siap Publikasi</option>
                  </select>

                  <select
                    value={templateFilter}
                    onChange={(e) => setTemplateFilter(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="all">Semua Desain Template</option>
                    <option value="ruang-rasa">Seri Editorial Modern</option>
                    <option value="malam-zamrud">Malam Zamrud (Art Deco)</option>
                    <option value="setangkai">Damar &amp; Alya (Sage)</option>
                    <option value="suasana">Jurnal Dua Hati (Buku)</option>
                    <option value="lembayung">Reel Sinematik 35mm</option>
                  </select>
                </div>
              </div>

              {/* High-Density Data Table */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                      <th className="py-3 px-4">ID &amp; Klien</th>
                      <th className="py-3 px-4">Template Terpilih</th>
                      <th className="py-3 px-4">Tanggal Perayaan</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi &amp; Generator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-normal">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => {
                        const templateDef = TEMPLATE_REGISTRY[order.templateId] || TEMPLATE_REGISTRY['ruang-rasa'];
                        
                        return (
                          <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* Client ID & Couple */}
                            <td className="py-3.5 px-4">
                              <span className="font-mono text-[10px] text-stone-500 block">
                                {order.id}
                              </span>
                              <span className="font-bold text-stone-900 text-sm">
                                {order.clientName}
                              </span>
                              <span className="text-[11px] text-stone-500 block">
                                {order.brideName} &amp; {order.groomName} · {order.city}
                              </span>
                            </td>

                            {/* Template Badge */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={templateDef.coverThumbnail} 
                                  alt={templateDef.name}
                                  className="w-8 h-8 rounded object-cover border border-stone-200"
                                />
                                <div>
                                  <span className="font-medium text-stone-900 block truncate max-w-[180px]">
                                    {templateDef.name}
                                  </span>
                                  <span className="text-[10px] text-[#C5A880] uppercase tracking-wider font-semibold">
                                    {templateDef.styleLabel}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Event Date */}
                            <td className="py-3.5 px-4 text-stone-700">
                              <span className="font-medium block">
                                {order.eventDateFormatted}
                              </span>
                              <span className="text-[10px] text-stone-500">
                                {order.resepsiVenue}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                order.status === 'published' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : order.status === 'in_progress'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : order.status === 'review'
                                  ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                  : 'bg-stone-100 text-stone-600 border border-stone-200'
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {order.status === 'published' ? 'Published' : order.status === 'in_progress' ? 'Proses Desain' : order.status === 'review' ? 'Review Klien' : 'Draf'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {/* Preview Customized Client Template */}
                                <button
                                  type="button"
                                  onClick={() => onPreviewClientInvitation(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#C5A880] hover:text-[#141413] text-stone-700 transition-colors cursor-pointer"
                                  title="Buka Pratinjau Klien"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Guest Link Generator */}
                                <button
                                  type="button"
                                  onClick={() => setGuestLinkOrder(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#C5A880] hover:text-[#141413] text-stone-700 transition-colors cursor-pointer"
                                  title="Buat Tautan Tamu WhatsApp"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit Order */}
                                <button
                                  type="button"
                                  onClick={() => handleEdit(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                                  title="Sunting Data Undangan"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Duplicate */}
                                <button
                                  type="button"
                                  onClick={() => handleDuplicate(order.id)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                                  title="Duplikasi Undangan Ini"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(order.id, order.clientName)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-100 hover:text-red-700 text-stone-500 transition-colors cursor-pointer"
                                  title="Hapus Undangan"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-stone-500">
                          <p className="text-sm font-medium">Tidak ada undangan yang cocok dengan pencarian.</p>
                          <p className="text-xs text-stone-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter status.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-2xs">
              <ClientOrderEditor
                initialData={editingOrder}
                onSave={handleSaveOrder}
                onCancel={() => {
                  setViewState('list');
                  setEditingOrder(null);
                }}
                onPreview={onPreviewClientInvitation}
              />
            </div>
          )}
        </div>
      </main>

      {/* Guest Link Personalization Modal */}
      {guestLinkOrder && (
        <GuestLinkModal
          invitation={guestLinkOrder}
          onClose={() => setGuestLinkOrder(null)}
        />
      )}

    </div>
  );
};
