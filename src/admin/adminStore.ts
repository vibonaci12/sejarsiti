import { ClientInvitationData, TemplateId } from '../types/clientInvitation';
import { TEMPLATE_REGISTRY } from './templateRegistry';

const STORAGE_KEY = 'sekarsiti_client_invitations_v1';

// Initial Seed Orders so the admin is never empty upon opening
const INITIAL_SEED_ORDERS: ClientInvitationData[] = [
  {
    id: 'INV-2027-001',
    clientName: 'Kirana & Adhitya',
    clientPhone: '081298765432',
    clientEmail: 'kirana.lestari@gmail.com',
    templateId: 'ruang-rasa',
    status: 'published',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-03T12:30:00Z',
    slug: 'kirana-adhitya',
    brideName: 'Kirana',
    brideFullName: 'Kirana Ayu Lestari, S.Ds.',
    brideParents: 'Putri pertama dari Bapak Hendra Wijaya & Ibu Sinta Maharani',
    brideInstagram: '@kiranaayuu',
    groomName: 'Adhitya',
    groomFullName: 'Adhitya Nugraha, B.Eng.',
    groomParents: 'Putra kedua dari Bapak Suryanto Nugraha & Ibu Ratna Dewi',
    groomInstagram: '@adhityanugraha',
    eventDateFormatted: 'Minggu, 14 Februari 2027',
    countdownIsoDate: '2027-02-14T08:00:00',
    akadTime: '08.00 – 09.30 WIB',
    akadVenue: 'Ruang Bimasena, Aryaduta Hotel',
    resepsiTime: '11.00 – 14.00 WIB',
    resepsiVenue: 'Grand Ballroom, Aryaduta Hotel',
    city: 'Jakarta Selatan',
    mapsUrl: 'https://maps.google.com',
    quoteText: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, serta menjadikan di antara kamu rasa kasih dan sayang.',
    quoteSource: 'QS. Ar-Rum : 21',
    bankName: 'BCA',
    accountNumber: '8271029384',
    accountHolder: 'Kirana Ayu Lestari',
    songTitle: 'Until I Found You - Stephen Sanchez (Violin Solo)',
    mediaSlots: {
      heroImage: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
      bridePortrait: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
      groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
      galleryImages: [
        '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
        '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg'
      ]
    },
    guestbookEntries: [
      { name: 'Raditya & Vanya', message: 'Selamat berbahagia Kirana & Adhitya!', time: '2 jam lalu' }
    ]
  },
  {
    id: 'INV-2026-002',
    clientName: 'Damar & Alya',
    clientPhone: '085712348765',
    clientEmail: 'damar.wibisono@gmail.com',
    templateId: 'setangkai',
    status: 'in_progress',
    createdAt: '2026-10-02T14:15:00Z',
    updatedAt: '2026-10-03T16:00:00Z',
    slug: 'damar-alya',
    brideName: 'Alya',
    brideFullName: 'Alya Puspita Ningrum',
    brideParents: 'Putri Bapak Bambang Tri Atmojo & Ibu Sri Wahyuni',
    groomName: 'Damar',
    groomFullName: 'Damar Aji Wibisono',
    groomParents: 'Putra Bapak Suhartono Wibisono & Ibu Endang Lestari',
    eventDateFormatted: 'Sabtu, 14 November 2026',
    countdownIsoDate: '2026-11-14T07:30:00',
    akadTime: '07.30 – 09.00 WIB',
    akadVenue: 'Griya Kunang Estate, Jl. Kaliurang Km. 12',
    resepsiTime: '10.30 – 13.30 WIB',
    resepsiVenue: 'Griya Kunang Lawn & Pavilion',
    city: 'Sleman, Yogyakarta',
    mapsUrl: 'https://maps.google.com',
    quoteText: 'Dan di antara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup.',
    quoteSource: 'QS. Ar-Rum : 21',
    bankName: 'BCA',
    accountNumber: '8801234567',
    accountHolder: 'Damar Aji Wibisono',
    songTitle: 'Until I Found You - Acoustic Strings',
    mediaSlots: {
      heroImage: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
      bridePortrait: '/src/assets/images/wedding_bride_portrait_1790833939171.jpg',
      groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
      galleryImages: [
        '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
        '/src/assets/images/botanical_estate_venue_1790919022237.jpg'
      ]
    }
  },
  {
    id: 'INV-2026-003',
    clientName: 'Larasati & Fajar',
    clientPhone: '081399887766',
    templateId: 'lembayung',
    status: 'published',
    createdAt: '2026-10-03T09:00:00Z',
    updatedAt: '2026-10-03T18:00:00Z',
    slug: 'larasati-fajar',
    brideName: 'Larasati',
    brideFullName: 'Larasati Sekar Kinanti, S.Sn.',
    brideParents: 'Putri tercinta Bapak Danang Triputra & Ibu Ratna Susilowati',
    groomName: 'Fajar',
    groomFullName: 'Fajar Nugraha Pratama, S.T.',
    groomParents: 'Putra tercinta Bapak Hendrawan Pratama & Ibu Nuraini Dewi',
    eventDateFormatted: 'Sabtu, 24 Oktober 2026',
    countdownIsoDate: '2026-10-24T08:00:00',
    akadTime: '08.00 – 10.00 WIB',
    akadVenue: 'Paviliun Rinjani, Sanur Heritage Estate',
    resepsiTime: '11.00 – 15.00 WIB',
    resepsiVenue: 'Amphitheater Garden, Sanur Estate',
    city: 'Denpasar, Bali',
    mapsUrl: 'https://maps.google.com',
    quoteText: 'Seperti rol film 35mm yang merekam tiap detik berharga, cinta kita adalah sinema abadi.',
    quoteSource: 'Sinema Kasih Kita',
    bankName: 'Bank BRI',
    accountNumber: '034101002938501',
    accountHolder: 'Fajar Nugraha Pratama',
    songTitle: 'Lagu Senja Analog - 35mm Acoustic Tape',
    mediaSlots: {
      heroImage: '/src/assets/images/film_vintage_couple_1791034007642.jpg',
      filmstripImages: [
        '/src/assets/images/film_vintage_couple_1791034007642.jpg',
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg'
      ],
      galleryImages: [
        '/src/assets/images/film_vintage_couple_1791034007642.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg'
      ]
    }
  }
];

export class AdminStore {
  private static getStore(): ClientInvitationData[] {
    if (typeof window === 'undefined') return INITIAL_SEED_ORDERS;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ORDERS));
      return INITIAL_SEED_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SEED_ORDERS;
    }
  }

  private static saveStore(data: ClientInvitationData[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  static getAll(): ClientInvitationData[] {
    return this.getStore();
  }

  static getById(id: string): ClientInvitationData | undefined {
    return this.getStore().find(item => item.id === id || item.slug === id);
  }

  static create(payload: Partial<ClientInvitationData>): ClientInvitationData {
    const orders = this.getStore();
    const id = `INV-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`;
    const templateId = payload.templateId || 'ruang-rasa';
    const templateDefaults = TEMPLATE_REGISTRY[templateId].defaultData;

    const slug = (payload.clientName || 'undangan-klien')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `undangan-${Date.now()}`;

    const newOrder: ClientInvitationData = {
      id,
      clientName: payload.clientName || 'Klien Baru',
      clientPhone: payload.clientPhone || '',
      clientEmail: payload.clientEmail || '',
      templateId,
      status: payload.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug,
      brideName: payload.brideName || templateDefaults.brideName || '',
      brideFullName: payload.brideFullName || templateDefaults.brideFullName || '',
      brideParents: payload.brideParents || templateDefaults.brideParents || '',
      brideInstagram: payload.brideInstagram || templateDefaults.brideInstagram || '',
      groomName: payload.groomName || templateDefaults.groomName || '',
      groomFullName: payload.groomFullName || templateDefaults.groomFullName || '',
      groomParents: payload.groomParents || templateDefaults.groomParents || '',
      groomInstagram: payload.groomInstagram || templateDefaults.groomInstagram || '',
      eventDateFormatted: payload.eventDateFormatted || templateDefaults.eventDateFormatted || 'Minggu, 14 Februari 2027',
      countdownIsoDate: payload.countdownIsoDate || templateDefaults.countdownIsoDate || '2027-02-14T08:00:00',
      akadTime: payload.akadTime || templateDefaults.akadTime || '08.00 – 10.00 WIB',
      akadVenue: payload.akadVenue || templateDefaults.akadVenue || 'Masjid / Gedung Akad',
      resepsiTime: payload.resepsiTime || templateDefaults.resepsiTime || '11.00 – 14.00 WIB',
      resepsiVenue: payload.resepsiVenue || templateDefaults.resepsiVenue || 'Grand Ballroom',
      city: payload.city || templateDefaults.city || 'Jakarta',
      mapsUrl: payload.mapsUrl || templateDefaults.mapsUrl || 'https://maps.google.com',
      quoteText: payload.quoteText || templateDefaults.quoteText || '',
      quoteSource: payload.quoteSource || templateDefaults.quoteSource || '',
      bankName: payload.bankName || templateDefaults.bankName || 'BCA',
      accountNumber: payload.accountNumber || templateDefaults.accountNumber || '1234567890',
      accountHolder: payload.accountHolder || templateDefaults.accountHolder || '',
      secondaryBankName: payload.secondaryBankName || '',
      secondaryAccountNumber: payload.secondaryAccountNumber || '',
      secondaryAccountHolder: payload.secondaryAccountHolder || '',
      qrisImageUrl: payload.qrisImageUrl || '',
      songTitle: payload.songTitle || templateDefaults.songTitle || 'Until I Found You',
      mediaSlots: payload.mediaSlots || {
        heroImage: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        bridePortrait: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
        galleryImages: [
          '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
          '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg'
        ]
      }
    };

    orders.unshift(newOrder);
    this.saveStore(orders);
    return newOrder;
  }

  static update(id: string, updates: Partial<ClientInvitationData>): ClientInvitationData {
    const orders = this.getStore();
    const index = orders.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Order with id ${id} not found`);
    }

    const updated: ClientInvitationData = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    orders[index] = updated;
    this.saveStore(orders);
    return updated;
  }

  static delete(id: string): void {
    const orders = this.getStore().filter(item => item.id !== id);
    this.saveStore(orders);
  }

  static duplicate(id: string): ClientInvitationData {
    const original = this.getById(id);
    if (!original) throw new Error('Original not found');

    return this.create({
      ...original,
      clientName: `${original.clientName} (Salinan)`,
      status: 'pending'
    });
  }

  static generateShareLink(invitation: ClientInvitationData, guestName?: string): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const baseUrl = `${origin}/?client=${invitation.id}`;
    if (!guestName) return baseUrl;
    return `${baseUrl}&to=${encodeURIComponent(guestName)}`;
  }
}
