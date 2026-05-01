import { gql } from '@apollo/client'

export const GET_PAGINATED_PROJECTS = gql`
  query GetPaginatedProjects($pagination: PaginationInput) {
    paginatedProjects(pagination: $pagination) {
      items {
        id
        title
        slug
        description
        coverPhoto
        photos
        icon
        status
        startDate
        endDate
        members
        isFeatured
        createdAt
      }
      total
      hasMore
    }
  }
`

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      title
      slug
      description
      coverPhoto
      photos
      icon
      status
      startDate
      endDate
      members
      isFeatured
    }
  }
`

export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      title
      slug
      description
      coverPhoto
      photos
      icon
      status
      startDate
      endDate
      members
      isFeatured
    }
  }
`

export const GET_FEATURED_PROJECT = gql`
  query FeaturedProject {
    featuredProject {
      id
      title
      slug
      description
      coverPhoto
      icon
      status
      startDate
      endDate
      members
      isFeatured
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      slug
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      title
      slug
    }
  }
`

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: String!) {
    removeProject(id: $id) {
      id
    }
  }
`

export const SET_FEATURED_PROJECT = gql`
  mutation SetFeaturedProject($id: String!) {
    setFeaturedProject(id: $id) {
      id
      isFeatured
    }
  }
`
