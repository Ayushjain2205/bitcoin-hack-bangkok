interface Agent {
  id: number;
  name: string;
  image: string;
  specialization: string;
  funkinessLevel: number;
}
const agents: Agent[] = [
  {
    id: 1,
    name: "Disco Dan",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/Convo_Agent_89ef084f87.png",
    specialization: "Disco Data Analysis",
    funkinessLevel: 85,
  },
  {
    id: 2,
    name: "Funky Fiona",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_599f368aa5.jpeg",
    specialization: "Funk Content Creation",
    funkinessLevel: 92,
  },
  {
    id: 3,
    name: "Jazz Jack",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_34c4330acc.png",
    specialization: "Jazz Research Assistant",
    funkinessLevel: 78,
  },
  {
    id: 4,
    name: "Rock Rita",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_c89d85529b.png",
    specialization: "Rock Process Automation",
    funkinessLevel: 88,
  },
  {
    id: 5,
    name: "Techno Tim",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_4ebbeeec1f.jpeg",
    specialization: "Techno Task Management",
    funkinessLevel: 95,
  },
  {
    id: 6,
    name: "Soulful Sara",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_875049faab.png",
    specialization: "Soul Sentiment Analysis",
    funkinessLevel: 89,
  },
];
