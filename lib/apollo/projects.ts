import { gql } from '@apollo/client'

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
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

export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
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

export const GET_FEATURED_PROJECT = gql`
  query FeaturedProject {
    featuredProject {
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

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
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

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
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
