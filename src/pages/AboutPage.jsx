import Header from "../components/common/Header";
import SubHeader from "../components/common/SubHeader";

const AboutPage = () => {
  const data = {
    about: {
      id: 1,
      profile_id: 1,
      page_intro:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, placeat! Temporibus soluta quo a expedita",
      introduce:
        "Halo! Saya adalah seorang web developer dengan minat besar di bidang UI/UX dan teknologi backend.",
      about_image: "about-image.jpg",
      experience: "5 tahun pengalaman di pengembangan web.",
      about_video: {
        id: 1,
        title: "Perkenalan Diri",
        desc: "Video singkat tentang latar belakang dan perjalanan karier saya.",
        video: "perkenalan.mp4",
      },
      organization: {
        id: 1,
        organization_image: "organization-logo.png",
      },
    },
  };
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title={"About"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <SubHeader
          title={"About"}
          img={"page-header"}
          inputTitle={"Sub Header About"}
          inputValue={data.about.page_intro}
        />
      </main>
    </div>
  );
};
export default AboutPage;
