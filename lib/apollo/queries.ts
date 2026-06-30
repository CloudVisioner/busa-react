import { gql } from '@apollo/client'

export const PAGINATED_EVENTS = gql`
  query PaginatedEvents($pagination: PaginationInput) {
    paginatedEvents(pagination: $pagination) {
      items {
        id
        title
        slug
        date
        location
        description
        coverPhoto
        photos
        attendance
        type
        isFeatured
        createdAt
      }
      total
      hasMore
    }
  }
`

export const GET_FEATURED_EVENT = gql`
  query FeaturedEvent {
    featuredEvent {
      id
      title
      slug
      type
      date
      location
      attendance
      description
      coverPhoto
      isFeatured
      status
    }
  }
`

export const UPCOMING_EVENTS = gql`
  query UpcomingEvents {
    upcomingEvents {
      id
      title
      slug
      type
      date
      location
      description
      coverPhoto
      photos
      attendance
      isFeatured
      status
      createdAt
    }
  }
`

export const PAST_EVENTS = gql`
  query PastEvents($limit: Int!, $offset: Int!) {
    pastEvents(limit: $limit, offset: $offset) {
      items {
        id
        title
        slug
        type
        date
        location
        description
        coverPhoto
        photos
        attendance
        isFeatured
        status
        createdAt
      }
      total
      hasMore
    }
  }
`

export const PAGINATED_VISA_ARTICLES = gql`
  query PaginatedVisaArticles($pagination: PaginationInput) {
    paginatedVisaArticles(pagination: $pagination) {
      items {
        id
        title
        slug
        visaType
        readTime
        description
        content
        author
        createdAt
      }
      total
      hasMore
    }
  }
`

export const PAGINATED_GALLERY_PHOTOS = gql`
  query PaginatedGalleryPhotos($pagination: PaginationInput) {
    paginatedGalleryPhotos(pagination: $pagination) {
      items {
        id
        src
        alt
        event
        eventName
        year
        createdAt
      }
      total
      hasMore
    }
  }
`

export const GET_EVENTS = gql`
  query GetEvents($page: Int, $limit: Int) {
    events(page: $page, limit: $limit) {
      items {
        id title slug date location
        description coverPhoto photos attendance type isFeatured
      }
      total page limit
    }
  }
`

export const GET_EVENT = gql`
  query GetEvent($slug: String!) {
    event(slug: $slug) {
      id title slug date location
      description coverPhoto photos attendance type isFeatured
    }
  }
`

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      slug
      description
      coverPhoto
      photos
      isFeatured
      createdAt
      updatedAt
    }
  }
`

export const GET_PROJECT = gql`
  query GetProject($slug: String!) {
    project(slug: $slug) {
      id
      title
      slug
      description
      coverPhoto
      photos
      isFeatured
      createdAt
      updatedAt
    }
  }
`

export const GET_FEATURED_PROJECTS = gql`
  query GetFeaturedProjects {
    featuredProjects {
      id
      title
      slug
      description
      coverPhoto
      photos
      isFeatured
      createdAt
      updatedAt
    }
  }
`

export const GET_VISA_ARTICLES = gql`
  query GetVisaArticles($page: Int, $limit: Int) {
    visaArticles(page: $page, limit: $limit) {
      items {
        id title slug visaType readTime
        description isOutdated author createdAt
      }
      total page limit
    }
  }
`

export const GET_VISA_ARTICLE = gql`
  query GetVisaArticle($slug: String!) {
    visaArticle(slug: $slug) {
      id title slug content visaType readTime
      description isOutdated outdatedLink
      featureImage author createdAt
    }
  }
`

export const GET_VISA_ARTICLES_BY_TYPE = gql`
  query GetVisaArticlesByType($visaType: VisaTypeEnum!) {
    visaArticlesByType(visaType: $visaType) {
      id title slug visaType readTime description
    }
  }
`

export const GET_GALLERY_PHOTOS = gql`
  query GetGalleryPhotos($page: Int, $limit: Int) {
    galleryPhotos(page: $page, limit: $limit) {
      items {
        id src alt event year eventName
      }
      total page limit
    }
  }
`

export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($page: Int!, $limit: Int!) {
    teamMembers(page: $page, limit: $limit) {
      items {
        id name role photo year order
      }
      total page limit
    }
  }
`

/** Public fetch: omit `quote` until the API schema exposes it — requesting unknown fields clears the whole query. */
export const GET_TIMELINE = gql`
  query GetTimeline($page: Int, $limit: Int) {
    timelines(page: $page, limit: $limit) {
      items {
        id
        year
        description
        presidentName
        coverPhoto
        createdAt
      }
      total page limit
    }
  }
`

// Admin / Mentor panel queries
export const ADMIN_GET_EVENTS = gql`
  query AdminPaginatedEvents($pagination: PaginationInput) {
    paginatedEvents(pagination: $pagination) {
      items {
        id
        slug
        title
        type
        date
        location
        attendance
        isFeatured
        description
        coverPhoto
        photos
        status
        createdAt
      }
      total
      hasMore
    }
  }
`

export const ADMIN_GET_PROJECTS = gql`
  query AdminDashboardProjects {
    projects {
      id
      title
      coverPhoto
    }
  }
`

export const ADMIN_GET_VISA_ARTICLES = gql`
  query AdminPaginatedVisaArticles($pagination: PaginationInput) {
    paginatedVisaArticles(pagination: $pagination) {
      items {
        id
        slug
        title
        visaType
        description
        content
        author
        readTime
        createdAt
      }
      total
      hasMore
    }
  }
`

export const ADMIN_GET_GALLERY = gql`
  query AdminPaginatedGallery($pagination: PaginationInput) {
    paginatedGalleryPhotos(pagination: $pagination) {
      items {
        id
        src
        alt
        event
        eventName
        year
        createdAt
      }
      total
      hasMore
    }
  }
`

/** Keep fields in sync with API `TeamMember` / `GET_TEAM_MEMBERS` — unknown fields break the whole query. */
export const ADMIN_GET_TEAM = gql`
  query AdminGetTeam($page: Int!, $limit: Int!) {
    teamMembers(page: $page, limit: $limit) {
      items {
        id
        name
        role
        photo
        year
        order
      }
      total
      page
      limit
    }
  }
`

export const ADMIN_GET_TIMELINE = gql`
  query AdminGetTimeline($page: Int, $limit: Int) {
    timelines(page: $page, limit: $limit) {
      items {
        id
        year
        description
        presidentName
        quote
        coverPhoto
        createdAt
      }
      total
      page
      limit
    }
  }
`

// Events mutations (schema: `input` arg, `deleteEvent` — not `createEventInput` / `removeEvent`)
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      slug
      type
      date
      location
      attendance
      description
      coverPhoto
      photos
      createdAt
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      slug
      title
    }
  }
`

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

export const SET_FEATURED_EVENT = gql`
  mutation SetFeaturedEvent($id: String!) {
    setFeaturedEvent(id: $id) {
      id
      title
      isFeatured
    }
  }
`

export const SET_EVENT_STATUS = gql`
  mutation SetEventStatus($id: String!, $status: String!) {
    setEventStatus(id: $id, status: $status) {
      id
      status
    }
  }
`

// Visa article mutations
export const CREATE_VISA_ARTICLE = gql`
  mutation CreateVisaArticle($input: CreateVisaArticleInput!) {
    createVisaArticle(input: $input) {
      id
      slug
      title
    }
  }
`

export const UPDATE_VISA_ARTICLE = gql`
  mutation UpdateVisaArticle($id: String!, $input: UpdateVisaArticleInput!) {
    updateVisaArticle(id: $id, input: $input) {
      id
      slug
      title
    }
  }
`

export const DELETE_VISA_ARTICLE = gql`
  mutation DeleteVisaArticle($id: String!) {
    deleteVisaArticle(id: $id) {
      id
    }
  }
`

// Gallery mutations
export const CREATE_GALLERY_PHOTO = gql`
  mutation CreateGalleryPhoto($input: CreateGalleryPhotoInput!) {
    createGalleryPhoto(input: $input) {
      id
      src
      alt
    }
  }
`

export const DELETE_GALLERY_PHOTO = gql`
  mutation DeleteGalleryPhoto($id: String!) {
    deleteGalleryPhoto(id: $id) {
      id
    }
  }
`

// Team mutations
export const CREATE_TEAM_MEMBER = gql`
  mutation CreateTeamMember($input: CreateTeamMemberInput!) {
    createTeamMember(input: $input) {
      id
      name
      role
    }
  }
`

export const UPDATE_TEAM_MEMBER = gql`
  mutation UpdateTeamMember($id: String!, $input: UpdateTeamMemberInput!) {
    updateTeamMember(id: $id, input: $input) {
      id
      name
      role
    }
  }
`

export const DELETE_TEAM_MEMBER = gql`
  mutation DeleteTeamMember($id: String!) {
    deleteTeamMember(id: $id) {
      id
    }
  }
`

// Timeline mutations
export const CREATE_TIMELINE_ENTRY = gql`
  mutation CreateTimeline($input: CreateTimelineInput!) {
    createTimeline(input: $input) {
      id
      year
      description
      presidentName
      quote
      coverPhoto
      createdAt
    }
  }
`

export const UPDATE_TIMELINE_ENTRY = gql`
  mutation UpdateTimeline($id: String!, $input: UpdateTimelineInput!) {
    updateTimeline(id: $id, input: $input) {
      id
      year
      description
      presidentName
      quote
      coverPhoto
      createdAt
    }
  }
`

export const DELETE_TIMELINE_ENTRY = gql`
  mutation DeleteTimelineEntry($id: String!) {
    deleteTimeline(id: $id) {
      id
    }
  }
`
