import type { Schema, Struct } from '@strapi/strapi';

export interface CommonContacts extends Struct.ComponentSchema {
  collectionName: 'components_common_contacts';
  info: {
    displayName: 'contacts';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    addressLink: Schema.Attribute.String & Schema.Attribute.Required;
    clientsPhone: Schema.Attribute.String & Schema.Attribute.Required;
    commonPhone: Schema.Attribute.String & Schema.Attribute.Required;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonNavigation extends Struct.ComponentSchema {
  collectionName: 'components_common_navigations';
  info: {
    displayName: 'navigation';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface CommonSocials extends Struct.ComponentSchema {
  collectionName: 'components_common_socials';
  info: {
    displayName: 'socials';
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HomepageDescription extends Struct.ComponentSchema {
  collectionName: 'components_homepage_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {};
}

export interface HomepageHeroBlock extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_blocks';
  info: {
    displayName: 'heroBlock';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    backgroundMobile: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    description: Schema.Attribute.JSON & Schema.Attribute.Required;
    title: Schema.Attribute.JSON & Schema.Attribute.Required;
  };
}

export interface HomepageTitle extends Struct.ComponentSchema {
  collectionName: 'components_homepage_titles';
  info: {
    displayName: 'title';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.contacts': CommonContacts;
      'common.navigation': CommonNavigation;
      'common.socials': CommonSocials;
      'homepage.description': HomepageDescription;
      'homepage.hero-block': HomepageHeroBlock;
      'homepage.title': HomepageTitle;
    }
  }
}
