import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar configuration for VectorDocs
 * Slick, minimalistic, and modern navigation
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Routing',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'BGP',
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'routing/bgp/as_path/index',
              label: 'AS Path',
            },
            {
              type: 'doc',
              id: 'routing/bgp/bgp-attributes/index',
              label: 'BGP Attributes',
            },
            {
              type: 'doc',
              id: 'routing/bgp/bgp-route-selection/index',
              label: 'Route Selection',
            },
            {
              type: 'doc',
              id: 'routing/bgp/fsm/index',
              label: 'Finite State Machine',
            },
            {
              type: 'doc',
              id: 'routing/bgp/local_preference/index',
              label: 'Local Preference',
            },
          ],
        },
        {
          type: 'category',
          label: 'MPLS',
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'routing/mpls/fec/index',
              label: 'Forwarding Equivalence Class',
            },
            {
              type: 'doc',
              id: 'routing/mpls/follow-the-label/index',
              label: 'Follow the Label',
            },
            {
              type: 'doc',
              id: 'routing/mpls/lsp/index',
              label: 'Label Switched Path',
            },
            {
              type: 'doc',
              id: 'routing/mpls/MPLS-header/index',
              label: 'MPLS Header',
            },
            {
              type: 'doc',
              id: 'routing/mpls/route-reflection/index',
              label: 'Route Reflection',
            },
            {
              type: 'doc',
              id: 'routing/mpls/TTL/index',
              label: 'Time to Live',
            },
          ],
        },
        {
          type: 'category',
          label: 'OSPF',
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'routing/ospf/lsa1/index',
              label: 'Type 1 - Router LSA',
            },
            {
              type: 'doc',
              id: 'routing/ospf/lsa2/index',
              label: 'Type 2 - Network LSA',
            },
            {
              type: 'doc',
              id: 'routing/ospf/lsa3/index',
              label: 'Type 3 - Summary LSA',
            },
            {
              type: 'doc',
              id: 'routing/ospf/lsa4/index',
              label: 'Type 4 - ASBR Summary',
            },
            {
              type: 'doc',
              id: 'routing/ospf/lsa5/index',
              label: 'Type 5 - AS External',
            },
            {
              type: 'doc',
              id: 'routing/ospf/packet-types/index',
              label: 'Packet Types',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'projects/automation/junos-snapshot-administrator-jsnapy/index',
          label: 'Junos SNAP Admin',
        },
        {
          type: 'doc',
          id: 'routing/projects/automation/junos-snapshot-administrator-in-python-jsnapy/index',
          label: 'Junos SNAP Admin (Python)',
        },
      ],
    },
    {
      type: 'category',
      label: 'Junos',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'junos/tagging',
          label: 'Tagging',
        },
      ],
    },
  ],
};

export default sidebars;
