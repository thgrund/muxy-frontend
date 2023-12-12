# muxy-frontend
Frontend for stream performance registration

## Development Environment Variables Setup
1. Create file `.env.local`
2. Add the following variables:
```
REACT_APP_MUXY_API_KEY=super-secret-muxy-api-key
REACT_APP_EVENT_SLUG=muxy-event-slug
REACT_APP_MUXY_URL=muxy-base-url
```

## event page 
HTML set in: `src/app/components/EventHeader.tsx`
* Intro (Toplap presents:), event Title


## event details
Slot duration set in: 
* `src/app/components/PerformanceList.tsx`
* const SLOT_DURATION_MIN

Event start date/time, end date/time, preparation time, support links etc set in Muxy Admin:
* https://muxy.tidalcycles.org/admin




