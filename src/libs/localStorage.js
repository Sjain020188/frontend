import { env } from 'libs/config';

const tripKey = `please-${env}-anonymous-trip`;

function removeUselessFields(trip) {
  delete trip._id;
  delete trip.owner;
  delete trip.bookingStatus;
  delete trip.privacy;
  delete trip.status;
  delete trip.reviewCount;
  delete trip.ratings;
  delete trip.forkedBookingCounts;
}

export function saveTrip(trip) {
  const tripToSave = {
    adultCount: trip.adultCount,
    childrenCount: trip.childrenCount,
    infantCount: trip.infantCount,
    peopleCount: trip.peopleCount,
    media: trip.media,
    otherAttributes: trip.otherAttributes,
    services: trip.services,
    title: trip.title,
    description: trip.description,
    location: trip.location,
    duration: trip.duration,
  };

  localStorage.setItem(tripKey, JSON.stringify(tripToSave));
}

export function removeTrip() {
  localStorage.removeItem(tripKey);
}

export function isTripSaved() {
  const trip = JSON.parse(localStorage.getItem(tripKey));
  return Boolean(trip && trip.services && trip.services.length > 0);
}

export function loadTrip(withFullServices = true) {
  const localStorageTrip = localStorage.getItem(tripKey);
  if (localStorageTrip) {
    const trip = JSON.parse(localStorageTrip);
    removeUselessFields(trip);

    return {
      ...trip,
      services: withFullServices
        ? trip.services
        : trip.services.map(service => ({
            ...service,
            service: service.service._id,
          })),
    };
  }
  return {
    title: {
      'en-us': 'New Trip',
    },
    services: [],
    media: [],
    basePrice: 0,
    duration: 1,
  };
}
