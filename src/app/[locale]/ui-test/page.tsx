import { Container, Section, Grid, Flex } from "@/components/ui";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function FormsTestPage() {
  return (
    <Section padding="lg">
      <Container maxWidth="2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Test UI Components & Forms
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Kiểm tra các UI components và forms đã tạo
          </p>
        </div>

        <Grid cols={2} gap="lg">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Login Form
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <LoginForm redirectTo="/dashboard" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Register Form
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <RegisterForm redirectTo="/auth/login" />
              </div>
            </div>
          </div>
        </Grid>

        {/* UI Components Test Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            UI Components Test
          </h2>

          <Grid cols={3} gap="lg">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Buttons
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Primary Button
                </button>
                <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                  Secondary Button
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                  Outline Button
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Form Elements
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Text Input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email Input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option>Select Option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Badges & Alerts
              </h3>
              <div className="space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Primary Badge
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Success Badge
                </span>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This is an info alert message
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </div>

        {/* Layout Components Test */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Layout Components Test
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Flex Layout
              </h3>
              <Flex
                justify="between"
                align="center"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <span>Left Content</span>
                <span>Center Content</span>
                <span>Right Content</span>
              </Flex>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Grid Layout (4 columns)
              </h3>
              <Grid cols={4} gap="md">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-center">
                  Item 1
                </div>
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                  Item 2
                </div>
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-center">
                  Item 3
                </div>
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-center">
                  Item 4
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
