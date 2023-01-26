import { type NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface PostLike {
  id: string;
  last_updated: string;
}

interface Message extends PostLike {
  text: string;
}

interface Conversation extends PostLike {
  name: string;
  messages: Message[];
}

const sortByNewest = (a: PostLike, b: PostLike) => {
  return (
    new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
  );
};

const sortByOldest = (a: PostLike, b: PostLike) => {
  return (
    new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime()
  );
};

const data: Conversation[] = [
  {
    id: "5f58bcd7a88fab5f34df94d6",
    name: "eiusmod nostrud sunt",
    last_updated: "2020-05-04T03:37:18",
    messages: [
      {
        id: "5f58bcd7352396fffbae8b6e",
        text: "Lorem labore ea et",
        last_updated: "2020-02-16T04:35:16",
      },
      {
        id: "5f58bcd7d95151eaa14ab8aa",
        text: "ex excepteur deserunt laboris",
        last_updated: "2020-08-18T11:16:45",
      },
      {
        id: "5f58bcd7f7745918c2252086",
        text: "dolore sunt reprehenderit cupidatat",
        last_updated: "2020-03-23T10:06:33",
      },
    ],
  },
  {
    id: "5f58bcd7200c90cfaac93778",
    name: "laborum irure enim",
    last_updated: "2020-01-18T02:37:10",
    messages: [
      {
        id: "5f58bcd7fd44c584cdc6a3c3",
        text: "nostrud eiusmod non ut",
        last_updated: "2020-07-13T03:56:26",
      },
      {
        id: "5f58bcd7d5f9b5ff7c3f4216",
        text: "voluptate nulla commodo reprehenderit",
        last_updated: "2020-01-02T11:50:36",
      },
      {
        id: "5f58bcd7e7211b14921efa23",
        text: "quis laboris fugiat est",
        last_updated: "2020-02-11T06:04:03",
      },
      {
        id: "5f58bcd759c87fa1b24db871",
        text: "et aliqua nisi laborum",
        last_updated: "2020-09-07T10:33:39",
      },
      {
        id: "5f58bcd7587a80c99f3a28e6",
        text: "deserunt excepteur in eu",
        last_updated: "2020-02-08T01:22:02",
      },
      {
        id: "5f58bcd7bb6ee157a6ee7be4",
        text: "amet sunt veniam aute",
        last_updated: "2020-06-02T11:14:29",
      },
      {
        id: "5f58bcd76bf97a358212baab",
        text: "laboris commodo do aliqua",
        last_updated: "2020-04-19T10:27:37",
      },
    ],
  },
  {
    id: "5f58bcd7c23d93722017ccb6",
    name: "ex cupidatat elit",
    last_updated: "2020-05-15T06:24:26",
    messages: [
      {
        id: "5f58bcd72dfebe40537c379e",
        text: "amet sint laborum ut",
        last_updated: "2020-05-14T12:24:10",
      },
      {
        id: "5f58bcd7b449b1cfae268ee1",
        text: "nostrud adipisicing Lorem aute",
        last_updated: "2020-07-31T04:26:38",
      },
      {
        id: "5f58bcd7357fd38a634ada62",
        text: "proident nisi in nulla",
        last_updated: "2020-07-13T12:50:37",
      },
      {
        id: "5f58bcd744483b63148b8620",
        text: "exercitation Lorem cillum elit",
        last_updated: "2020-07-25T07:29:04",
      },
      {
        id: "5f58bcd7bf8843d460502aad",
        text: "qui sint irure sunt",
        last_updated: "2020-02-24T03:21:14",
      },
    ],
  },
  {
    id: "5f58bcd7e81abbc8cde13cde",
    name: "ut officia aliqua",
    last_updated: "2020-02-23T11:08:58",
    messages: [
      {
        id: "5f58bcd7a34519f19acd17ab",
        text: "anim dolor laboris nulla",
        last_updated: "2020-03-31T08:52:51",
      },
      {
        id: "5f58bcd78cc10cd1c1eab267",
        text: "deserunt reprehenderit deserunt eiusmod",
        last_updated: "2020-03-04T02:50:41",
      },
      {
        id: "5f58bcd7b1bd2b6c9c60103a",
        text: "cillum occaecat et culpa",
        last_updated: "2020-04-06T10:26:35",
      },
      {
        id: "5f58bcd7a42c13c4c10de5b6",
        text: "veniam et eiusmod eu",
        last_updated: "2020-06-27T01:06:41",
      },
      {
        id: "5f58bcd7334d5227c8db9520",
        text: "incididunt ullamco irure ut",
        last_updated: "2020-03-08T05:36:47",
      },
      {
        id: "5f58bcd750b3180330f4600f",
        text: "voluptate est eiusmod culpa",
        last_updated: "2020-07-26T11:58:12",
      },
      {
        id: "5f58bcd76fbc7df84b0a3cf4",
        text: "ipsum esse cupidatat sit",
        last_updated: "2020-04-11T06:57:03",
      },
      {
        id: "5f58bcd79c0390617f81a01f",
        text: "nostrud ut deserunt aute",
        last_updated: "2020-04-29T06:29:58",
      },
      {
        id: "5f58bcd72564603b846a41ac",
        text: "nisi do tempor non",
        last_updated: "2020-02-16T03:05:41",
      },
    ],
  },
  {
    id: "5f58bcd7a3d6fed0fd68b7a9",
    name: "consequat amet cupidatat",
    last_updated: "2020-04-08T06:45:00",
    messages: [
      {
        id: "5f58bcd7c34da3af332cc958",
        text: "tempor elit sit incididunt",
        last_updated: "2020-06-15T06:40:25",
      },
      {
        id: "5f58bcd706ac7b83822c692f",
        text: "laboris commodo id anim",
        last_updated: "2020-04-08T06:26:18",
      },
      {
        id: "5f58bcd7e0a785e3e5516e47",
        text: "quis dolore occaecat irure",
        last_updated: "2020-07-10T06:56:34",
      },
      {
        id: "5f58bcd79d24061ede254048",
        text: "irure dolor nulla ullamco",
        last_updated: "2020-02-14T02:14:32",
      },
      {
        id: "5f58bcd7a6bf2527d1bde8cd",
        text: "mollit ipsum occaecat aute",
        last_updated: "2020-03-25T05:35:35",
      },
      {
        id: "5f58bcd79cac300d1980db1b",
        text: "ad cillum occaecat cupidatat",
        last_updated: "2020-08-01T07:23:38",
      },
      {
        id: "5f58bcd75e712600083cd4e6",
        text: "incididunt excepteur qui magna",
        last_updated: "2020-04-17T04:37:53",
      },
      {
        id: "5f58bcd7e99102f90e2c9130",
        text: "labore aute ad laborum",
        last_updated: "2020-03-15T10:43:57",
      },
      {
        id: "5f58bcd7f7f92c4b24287bbd",
        text: "ad esse sunt dolor",
        last_updated: "2020-05-16T11:17:31",
      },
      {
        id: "5f58bcd7494bcc51e9df2d4e",
        text: "nisi pariatur quis ut",
        last_updated: "2020-01-21T05:19:04",
      },
    ],
  },
].sort(sortByNewest);

const Home: NextPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>(data);
  const [selectedId, setSelectedId] = useState<string | null>(
    conversations[0]?.id || null
  );
  const [comment, setComment] = useState<string>("");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  const commentsRef = useRef<HTMLUListElement>(null);

  const renderDate = (date: string) => {
    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleComment = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    setComment(target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (comment.length === 0) return;

    const newComment = {
      // not quite sure why ESLint is complaining about this
      id: uuidv4() as string,
      text: comment,
      last_updated: new Date().toISOString(),
    };

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === selectedId) {
        return {
          ...conversation,
          messages:
            selectedMessageId !== null
              ? conversation.messages.map((message) => {
                  if (message.id === selectedMessageId) {
                    return {
                      ...message,
                      text: comment,
                    };
                  }

                  return message;
                })
              : [newComment, ...conversation.messages],
        };
      }

      return conversation;
    });

    setConversations(updatedConversations);
    setComment("");
    setSelectedMessageId(null);
  };

  const scrollToBottomOfComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  };

  const handleMessageClick = (id: string) => {
    const selectedMessage = conversations
      .find((conversation) => conversation.id === selectedId)
      ?.messages.find((message) => message.id === id);

    setSelectedMessageId(id);
    setComment(selectedMessage?.text || "");
  };

  useEffect(() => {
    scrollToBottomOfComments();
  }, [conversations, commentsRef]);

  useEffect(() => {
    scrollToBottomOfComments();
  }, [selectedId, commentsRef]);

  return (
    <>
      <Head>
        <title>Blink task</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex rounded-md bg-white shadow-lg">
          <aside>
            {data.length > 0 && (
              <ul className="space-y-4 p-4">
                {data.map((item) => (
                  <li
                    key={item.id}
                    className="font-bold leading-none text-purple-500"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
          <div className="min-w-[500px] border-l">
            {selectedId && (
              <ul
                ref={commentsRef}
                className="max-h-[30vh] space-y-8 overflow-y-scroll p-4"
              >
                {conversations
                  .find((item) => item.id === selectedId)
                  ?.messages.sort(sortByOldest)
                  .map((message) => (
                    <li
                      key={message.id}
                      className="flex flex-col space-y-2 leading-none"
                      onClick={() => handleMessageClick(message.id)}
                    >
                      <span className=" font-semibold">{message.text}</span>
                      <span className="text-xs font-semibold text-gray-500">
                        {renderDate(message.last_updated)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2 p-2">
              <input
                type="text"
                placeholder="Type a comment"
                value={comment}
                onChange={handleComment}
                className="block w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {selectedMessageId !== null ? "Edit" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
