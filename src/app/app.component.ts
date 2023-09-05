import { Component } from "@angular/core";

 export interface Course {
  id: string,
  title: string,
  description: string,
  creationDate: Date,
  duration: number,
  authors: string[]
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  courses: Course[] = [
    {
      id: "asfdsfsd1212-sdfsd12cz-werw",
      authors: ["Ryhor"],
      creationDate: new Date(),
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ullam, magnam consectetur nisi quas fugit, velit numquam error veniam nostrum, molestiae cupiditate voluptate fuga. Deserunt, vel nihil! Atque aspernatur accusamus deserunt nobis dignissimos ab ex sit debitis molestiae unde aut, consequuntur provident quae neque pariatur minima. Ut accusamus cupiditate optio at officiis, obcaecati saepe eos dolorem sint ipsum, assumenda non voluptate autem vel earum officia dignissimos iste eaque. Ipsum id, repellat nisi similique fugiat cumque, laboriosam natus atque dolor quibusdam rerum ex accusantium autem dolorum! Excepturi dolor alias asperiores quo, quasi eveniet eum harum nostrum nam provident mollitia corporis dicta debitis veniam ipsum ducimus praesentium, molestiae illo hic, iste fugit nisi optio at fugiat. Ducimus minima omnis eveniet, sint nulla, quaerat numquam pariatur ipsam, unde qui quidem doloremque? Numquam iusto, possimus sint dignissimos, quia deserunt praesentium impedit corrupti eos perferendis debitis earum facere ex tempore voluptates minima facilis distinctio? Rerum voluptas, asperiores cumque laudantium perspiciatis doloribus. Ullam ipsa id illo molestiae pariatur, possimus in quam excepturi officiis reprehenderit quae veritatis vitae deserunt commodi neque doloremque odit voluptatum nihil laborum fugit maxime! Temporibus quisquam eveniet, consectetur animi magnam quas voluptatem illum cumque pariatur voluptatum in, maiores accusantium eaque debitis. Fuga, suscipit?",
      duration: 10,
      title: "Angular",
    },
    {
      id: "12321-dasd-56-fgh",
      authors: ["Ryhor"],
      creationDate: new Date(),
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ullam, magnam consectetur nisi quas fugit, velit numquam error veniam nostrum, molestiae cupiditate voluptate fuga. Deserunt, vel nihil! Atque aspernatur accusamus deserunt nobis dignissimos ab ex sit debitis molestiae unde aut, consequuntur provident quae neque pariatur minima. Ut accusamus cupiditate optio at officiis, obcaecati saepe eos dolorem sint ipsum, assumenda non voluptate autem vel earum officia dignissimos iste eaque. Ipsum id, repellat nisi similique fugiat cumque, laboriosam natus atque dolor quibusdam rerum ex accusantium autem dolorum! Excepturi dolor alias asperiores quo, quasi eveniet eum harum nostrum nam provident mollitia corporis dicta debitis veniam ipsum ducimus praesentium, molestiae illo hic, iste fugit nisi optio at fugiat. Ducimus minima omnis eveniet, sint nulla, quaerat numquam pariatur ipsam, unde qui quidem doloremque? Numquam iusto, possimus sint dignissimos, quia deserunt praesentium impedit corrupti eos perferendis debitis earum facere ex tempore voluptates minima facilis distinctio? Rerum voluptas, asperiores cumque laudantium perspiciatis doloribus. Ullam ipsa id illo molestiae pariatur, possimus in quam excepturi officiis reprehenderit quae veritatis vitae deserunt commodi neque doloremque odit voluptatum nihil laborum fugit maxime! Temporibus quisquam eveniet, consectetur animi magnam quas voluptatem illum cumque pariatur voluptatum in, maiores accusantium eaque debitis. Fuga, suscipit?",
      duration: 10,
      title: "Angular",
    }
  ];

  onShowCourse(event: string) {
    console.log(`show single course: ${event}`);
  }

  onShow(event: string) {
    console.log(`show: ${event}`);
  }

  onEdit(event: string) {
    console.log(`edit: ${event}`);
  }

  onDelete(event: string) {
    console.log(`delete: ${event}`);
  }
}
