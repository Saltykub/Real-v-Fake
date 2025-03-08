import Profile from "@/components/profile";

export default function About() {
  return (
    <div className="items-center flex flex-col mx-auto p-8 w-[900px]">
      <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        About us
      </h2>
      <p>
      At AI-Powered Store Legitimacy Detector, we use cutting-edge artificial intelligence to assess the authenticity of online stores by analyzing product data and customer reviews. Our system evaluates key factors such as sentiment in reviews, product ratings, and review counts to generate a trust score between 0 (fake) and 1 (real). By leveraging machine learning and statistical models, we provide users with data-driven insights to help them make informed purchasing decisions and avoid fraudulent sellers. With the growing prevalence of online scams and counterfeit products, our tool empowers consumers with a reliable way to verify store legitimacy before making a purchase. We are committed to enhancing trust in e-commerce, ensuring a safer and smarter shopping experience for everyone.
      </p>
      <div className="flex justify-between w-[700px] mt-20">
        <Profile url="auto.jpg" name="Peeranat Kongkipipat" course="BCG/2" />
        <Profile url="pleng.jpg" name="Plengpin Tongdon-ngao" course="CE/1" />
        <Profile url="fair.jpg" name="Kulpatch Chananam" course="CSEC/2" />
        <Profile url="poon.jpg" name="Nathan Juirnarongrit" course="BCE/2" />
      </div>
    </div>
  );
}
