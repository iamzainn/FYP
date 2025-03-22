import { defaultStyles } from "@/components/editor/BUILDER/Container"
import { v4 } from "uuid"
import { EditorBtns } from "./constants"

import { useEditor } from "@/providers/editor/editor-provider"
import { EditorElement } from "@/providers/editor/editor-provider"

export const useDropHandler = () => {
    const {dispatch,} = useEditor()
    
    // Return the handler function
    return (componentType: EditorBtns, id: string) => {
    switch(componentType) {
        case 'text':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: {
                  innerText: 'Text Element',
                },
                id: v4(),
                name: 'Text',
                styles: { ...defaultStyles },
                type: 'text',
              },
            },
          })
          break
        case 'video':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: {
                  src: 'https://www.youtube.com/embed/zR7P9EcOQRM?si=OGsTtd1qOQmMzujJ',
                },
                id: v4(),
                name: 'Video',
                styles: { ...defaultStyles },
                type: 'video',
              },
            },
          })
          break
        case 'container':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: [],
                id: v4(),
                name: 'Container',
                styles: { ...defaultStyles },
                type: 'container',
              },
            },
          })
          break
  case 'link':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {
            innerText: 'Link Element',
            href: '#',
          },
          id: v4(),
          name: 'Link',
          styles: {
            color: 'black',
            ...defaultStyles,
          },
          type: 'link',
        },
      },
    })
    break;
    case '2Col':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: [
            {
              content: [],
              id: v4(),
              name: 'Container',
              styles: { ...defaultStyles, width: '100%' },
              type: 'container',
            },
            {
              content: [],
              id: v4(), 
              name: 'Container',
              styles: { ...defaultStyles, width: '100%' },
              type: 'container',
            },
          ],
          id: v4(),
          name: 'Two Columns',
          styles: { ...defaultStyles, display: 'flex' },
          type: '2Col',
        },
      },
    })
    break;
    case 'contactForm':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: [],
          id: v4(),
          name: 'Contact Form',
          styles: {},
          type: 'contactForm',
        },
      },
    })
    break;
    case 'button':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {
            innerText: 'Click me',
            href: '#',
          },
          id: v4(),
          name: 'Button',
          styles: {
            backgroundColor: '#0091ff',
            color: 'white',
            borderRadius: '4px',
            padding: '8px 16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            ...defaultStyles,
          },
          type: 'button',
        },
      },
    })
    break;
    case 'image':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {
            src: 'https://placehold.co/600x400?text=Add+Image',
            alt: 'Product image',
          },
          id: v4(),
          name: 'Image',
          styles: {
            objectFit: 'cover',
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
            ...defaultStyles,
          },
          type: 'image',
        },
      },
    })
    break;
    case 'divider':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {},
          id: v4(),
          name: 'Divider',
          styles: {
            backgroundColor: '#e5e7eb',
            height: '1px',
            width: '100%',
            margin: '1rem 0',
          },
          type: 'divider',
        },
      },
    })
    break;
    case 'spacer':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {},
          id: v4(),
          name: 'Spacer',
          styles: {
            height: '2rem',
            width: '100%',
          },
          type: 'spacer',
        },
      },
    })
    break;
    case 'badge':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {
            innerText: 'New',
          },
          id: v4(),
          name: 'Badge',
          styles: {
            backgroundColor: '#0091ff',
            color: 'white',
            borderRadius: '9999px',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          type: 'badge',
        },
      },
    })
    break;
    case 'icon':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {
            iconType: 'user',
          },
          id: v4(),
          name: 'Icon',
          styles: {
            fontSize: '24px',
            color: '#0091ff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          type: 'icon',
        },
      },
    })
    break;
    case 'productCard':
      // Create the product card with a complete hierarchy
      const productCardId = v4();
      const twoColId = v4();
      const leftColId = v4();
      const rightColId = v4();
      const imageId = v4();
              // const badgeId = v4();
      const titleId = v4();
      const priceId = v4();
      const descId = v4();
      const ratingContainerId = v4();
      const buttonId = v4();
      
      // Create complete hierarchy for product card with all nested elements
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
            id: productCardId,
        name: 'Product Card',
        styles: {
          backgroundColor: 'white',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          margin: '1rem 0',
          padding: '1rem',
          width: '100%',
        },
        type: 'productCard',
            content: [
              // Two Column Layout
              {
                id: twoColId,
                name: 'Two Columns',
                type: '2Col',
                styles: { 
                  display: 'flex', 
                  gap: '1rem',
                  alignItems: 'flex-start'
                },
                content: [
                  // Left Column (Image Container)
                  {
                    id: leftColId,
                    name: 'Container',
                    type: 'container',
                    styles: { 
                      width: '100%',
                      position: 'relative',
                      padding: '0'
                    },
                    content: [
                      // Product Image
                      {
                        id: imageId,
                        name: 'Image',
                        type: 'image',
                        styles: {
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '0.375rem',
                        },
                        content: {
                          src: 'https://placehold.co/300x300?text=Product+Image',
                          alt: 'Product image',
                          
                        },
                                  }
                      // Badge Element
                                  
                                  
                    ],
                  },
                  // Right Column (Content Container)
                  {
                    id: rightColId,
                    name: 'Container',
                    type: 'container',
                    styles: {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      padding: '0.5rem 0'
                    },
                    content: [
                      // Product Title
                      {
                        id: titleId,
                        name: 'Text',
                        type: 'text',
                        styles: {
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#333',
                        },
                        content: {
                          innerText: 'Product Title',
                        },
                      },
                      // Product Price
                      {
                        id: priceId,
                        name: 'Text',
                        type: 'text',
                        styles: {
                          fontSize: '1.125rem',
                          fontWeight: 'bold',
                          color: '#0091ff',
                          marginTop: '0.25rem',
                        },
                        content: {
                          innerText: '$99.99',
                        },
                      },
                      // Product Description
                      {
                        id: descId,
                        name: 'Text',
                        type: 'text',
                        styles: {
                          fontSize: '0.875rem',
                          color: '#666',
                          marginTop: '0.5rem',
                        },
                        content: {
                          innerText: 'Short product description goes here. Highlight key features and benefits.',
                        },
                      },
                      // Rating Container
                      {
                        id: ratingContainerId,
                        name: 'Container',
                        type: 'container',
                        styles: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          marginTop: '0.5rem',
                        },
                        content: [
                          // Star Icons
                          {
                            id: v4(),
                            name: 'Icon',
                            type: 'icon',
                            styles: {
                              color: '#FFD700',
                              fontSize: '16px',
                            },
                            content: {
                              iconType: 'star',
                            },
                          },
                          {
                            id: v4(),
                            name: 'Icon',
                            type: 'icon',
                            styles: {
                              color: '#FFD700',
                              fontSize: '16px',
                            },
                            content: {
                              iconType: 'star',
                            },
                          },
                          {
                            id: v4(),
                            name: 'Icon',
                            type: 'icon',
                            styles: {
                              color: '#FFD700',
                              fontSize: '16px',
                            },
                            content: {
                              iconType: 'star',
                            },
                          },
                          {
                            id: v4(),
                            name: 'Icon',
                            type: 'icon',
                            styles: {
                              color: '#FFD700',
                              fontSize: '16px',
                            },
                            content: {
                              iconType: 'star',
                            },
                          },
                          {
                            id: v4(),
                            name: 'Icon',
                            type: 'icon',
                            styles: {
                              color: '#e5e7eb',
                              fontSize: '16px',
                            },
                            content: {
                              iconType: 'star',
                            },
                          },
                          // Rating Count
                          {
                            id: v4(),
                            name: 'Text',
                            type: 'text',
                            styles: {
                              fontSize: '0.75rem',
                              marginLeft: '0.25rem',
                              color: '#666',
                            },
                            content: {
                              innerText: '(24)',
                            },
                          },
                        ],
                      },
                      // Add to Cart Button
                      {
                        id: buttonId,
                        name: 'Button',
                        type: 'button',
                        styles: {
                          backgroundColor: '#0091ff',
                          color: 'white',
                          borderRadius: '0.375rem',
                          padding: '0.5rem 1rem',
                          marginTop: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 'medium',
                          cursor: 'pointer',
                          width: 'fit-content',
                        },
                        content: {
                          innerText: 'Add to Cart',
                        },
                      },
                    ],
                  }
                ],
              }
            ],
                      },
                    
                    },
                  })
                  break;
            case 'grid':
              const defaultColumnCount = 2; // Default to 2 columns
              const gridCells:EditorElement[] = [];
              
              // Create grid cells
              for (let i = 0; i < defaultColumnCount; i++) {
                gridCells.push({
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { 
                    ...defaultStyles, 
                    padding: '8px',
                  },
                  type: 'container',
                });
              }
              
              dispatch({
                type: 'ADD_ELEMENT',
                payload: {
                  containerId: id,
                  elementDetails: {
                    content: [
                      ...gridCells
                    ],
                    id: v4(),
                    name: 'Grid Layout',
                    styles: { 
                      ...defaultStyles,
                      display: 'grid',
                      gap: '16px',
                      gridTemplateColumns: `repeat(${defaultColumnCount}, 1fr)`,
                    },
                    type: 'grid',
          },
        },
      });
  break;
            case 'heroSection':
              // Create heading for the hero section
              const headingElement = {
                content: 'Your Compelling Headline',
                id: crypto.randomUUID(),
                name: 'Heading',
                styles: {
                  color: '#ffffff',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                
                  textAlign: 'center',
                  margin: '0 0 2rem 0',
                  zIndex: 10,
                },
                type: 'heading',
                
              };
              
              // Create a button element
              const buttonElement = {
                content: 'Get Started',
                id: crypto.randomUUID(),
                name: 'Button',
                styles: {
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: 'medium',
                  cursor: 'pointer',
                  display: 'inline-block',
                  textAlign: 'center',
                  zIndex: 10,
                },
                type: 'button',
              };

              // Create the hero container with these elements
              dispatch({
                type: 'ADD_ELEMENT',
                payload: {
                  containerId: id,
                  elementDetails: {
                    content: [headingElement, buttonElement] as EditorElement[],
                    id: crypto.randomUUID(),
                    name: 'Hero Section',
                    styles: {
                      backgroundImage: 'url("https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '500px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      color: 'white',
                      textAlign: 'center',
                    
                    },
                    type: 'heroSection',
                  },
                },
              });
              break;
        default:
              break;
        }
    }
}

// Selection hook
export const useElementSelection = () => {
  const { dispatch } = useEditor()
  
  return (element: EditorElement) => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element
      }
    })
  }
}

// Deletion hook
export const useElementDeletion = () => {
  const { dispatch } = useEditor()
  
  return (element: EditorElement) => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }
}

