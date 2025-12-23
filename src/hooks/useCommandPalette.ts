import { useEffect, useState } from 'react';

export interface Command {
  id: string;
  title: string;
  description?: string;
  category: 'action' | 'booking' | 'navigation' | 'policy' | 'support';
  icon?: string;
  keywords: string[];
  execute: () => void | Promise<void>;
  enabled?: boolean;
}

// In-memory recent searches
const recentSearches = new Set<string>();

/**
 * Default command palette commands.
 * Can be extended with dynamic booking-specific commands.
 */
export const defaultCommands: Command[] = [
  // Navigation
  {
    id: 'nav-home',
    title: 'Go to Home',
    category: 'navigation',
    keywords: ['home', 'dashboard', 'main'],
    execute: () => {
      window.location.href = '/';
    },
  },
  {
    id: 'nav-hotels',
    title: 'Search Hotels',
    category: 'navigation',
    keywords: ['hotels', 'browse', 'search', 'find'],
    execute: () => {
      window.location.href = '/hotels';
    },
  },
  {
    id: 'nav-bookings',
    title: 'My Bookings',
    category: 'navigation',
    keywords: ['bookings', 'reservations', 'my', 'trips'],
    execute: () => {
      window.location.href = '/dashboard';
    },
  },

  // Quick Actions
  {
    id: 'action-new-booking',
    title: 'Start New Booking',
    description: 'Create a new hotel booking',
    category: 'action',
    keywords: ['new', 'booking', 'reserve', 'book'],
    execute: () => {
      window.location.href = '/hotels';
    },
  },

  // Cancellation & Refunds
  {
    id: 'action-cancel-last',
    title: 'Cancel Last Booking',
    description: 'Cancel your most recent booking',
    category: 'booking',
    keywords: ['cancel', 'last', 'booking', 'recent'],
    execute: () => {
      window.location.href = '/dashboard?action=cancel&sort=recent';
    },
  },
  {
    id: 'policy-cancellation',
    title: 'View Cancellation Policy',
    description: 'Read our cancellation & refund policies',
    category: 'policy',
    keywords: ['cancel', 'policy', 'refund', 'rules', 'terms'],
    execute: () => {
      window.location.href = '/support/cancellation-policy';
    },
  },
  {
    id: 'policy-refund',
    title: 'Refund Status',
    description: 'Check your refund status and timeline',
    category: 'booking',
    keywords: ['refund', 'status', 'money', 'return', 'pending'],
    execute: () => {
      window.location.href = '/dashboard?view=refunds';
    },
  },

  // Support
  {
    id: 'support-faq',
    title: 'FAQs',
    category: 'support',
    keywords: ['faq', 'help', 'questions', 'support'],
    execute: () => {
      window.location.href = '/support/faq';
    },
  },
  {
    id: 'support-contact',
    title: 'Contact Support',
    description: 'Get in touch with our support team',
    category: 'support',
    keywords: ['contact', 'support', 'help', 'email', 'chat'],
    execute: () => {
      window.location.href = '/support/contact';
    },
  },
];
