// GROQ queries using template literals

// Experience queries
export const experiencesQuery = `
  *[_type == "experience"] | order(order asc) {
    _id,
    company,
    role,
    duration,
    location,
    description,
    technologies,
    "logo": logo.asset->url,
    order
  }
`;

// Project queries
export const projectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    description,
    longDescription,
    categories,
    techStack,
    githubUrl,
    liveUrl,
    "image": image.asset->url,
    features,
    challenges,
    outcomes,
    timeline,
    teamSize,
    order
  }
`;

export const projectsByCategoryQuery = `
  *[_type == "project" && $category in categories] | order(order asc) {
    _id,
    title,
    description,
    longDescription,
    categories,
    techStack,
    githubUrl,
    liveUrl,
    "image": image.asset->url,
    features,
    challenges,
    outcomes,
    timeline,
    teamSize,
    order
  }
`;

export const projectByIdQuery = `
  *[_type == "project" && _id == $id][0] {
    _id,
    title,
    description,
    longDescription,
    categories,
    techStack,
    githubUrl,
    liveUrl,
    "image": image.asset->url,
    features,
    challenges,
    outcomes,
    timeline,
    teamSize,
    order
  }
`;

// Programming Language queries
export const programmingLanguagesQuery = `
  *[_type == "programmingLanguage"] | order(order asc) {
    _id,
    name,
    level,
    description,
    order
  }
`;

// Technology queries
export const technologiesQuery = `
  *[_type == "technology"] | order(category asc, order asc) {
    _id,
    name,
    category,
    description,
    iconName,
    order
  }
`;

export const technologiesByCategoryQuery = `
  *[_type == "technology" && category == $category] | order(order asc) {
    _id,
    name,
    category,
    description,
    iconName,
    order
  }
`;

// Cloud Provider queries (with certificates)
export const cloudProvidersWithCertificatesQuery = `
  *[_type == "cloudProvider"] | order(order asc) {
    _id,
    name,
    order,
    "certificates": *[_type == "certificate" && references(^._id)] | order(order asc) {
      _id,
      name,
      "image": image.asset->url,
      year,
      description,
      issuer,
      credentialId,
      verificationUrl,
      skills,
      order
    }
  }
`;

// Certificate queries
export const certificatesQuery = `
  *[_type == "certificate"] | order(year desc) {
    _id,
    name,
    "provider": provider->name,
    "providerId": provider->_id,
    "image": image.asset->url,
    year,
    description,
    issuer,
    credentialId,
    verificationUrl,
    skills,
    order
  }
`;

export const certificatesByProviderQuery = `
  *[_type == "certificate" && provider._ref == $providerId] | order(order asc) {
    _id,
    name,
    "image": image.asset->url,
    year,
    description,
    issuer,
    credentialId,
    verificationUrl,
    skills,
    order
  }
`;
