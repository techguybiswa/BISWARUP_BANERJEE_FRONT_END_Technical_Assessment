# Docs Book - Book Doctor appointments

<a href="https://docsbook.vercel.app/">LIVE LINK</a>

<img src="https://github.com/techguybiswa/necktie-docs-book-app/blob/main/src/assets/docsbooklogo.png"/>



## The User Journey

When the user loads the URL he is redirected to /doctors where the user sees a list of doctors. 

In "/doctors" the user can see the list of the doctors and also some basic info about them.

<img width="1440" alt="Screenshot 2023-11-12 at 1 16 37 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/d166149e-4438-4d4b-8480-da93c3c80a2c">

<i>A basic skeleton loader has been implemented to have a smoother experience.</i>

Also there is error handling in place that will display the error accordingly.

<img width="1438" alt="Screenshot 2023-11-12 at 1 31 10 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/a9a58821-ca02-49e6-b411-55289aac1e1e">

Once the user chooses a doctor. he will be taken to the doctor's profile page.

<img width="987" alt="Screenshot 2023-11-12 at 1 32 32 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/e069404d-cdd1-4891-91e0-973c32120895">

<br/>
<b>The main goal was to make th UI appear very elegant, clean and make it extremely communicative to the user.</b>

Considering the assumption that an user mostly books a doctor's appointment fairly urgently, in the dotor's profile, on the initial load we display just the <b> 5 most recent dates.</b> ( In the code base it can be easily reconfigure to have more or less number of recent dates) 

<i>Also we highlight "Today" and "Tomorrow" specifically to make it easier for the user.</i>

<img width="723" alt="Screenshot 2023-11-12 at 1 39 18 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/96c5e9e3-f783-4327-b255-ace1e468c8d7">


The user can book any custom date as well, but for that he needs to click on the <b> "View All"</b> that pops open a "booking wizard with a calander". 

<img width="1414" alt="Screenshot 2023-11-12 at 1 41 43 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/3e993eb8-cc38-4932-a159-e63c68af6850">

<i>The calander has not been directly been rendered on the first load because we do not want the user to feel overwhelmed with too many UI elements and rather let the user explore on his own as needed.</i>

Once the user selects the date from the recent dates, he is displayed the available slots. 

The available slots are displayed based on the following conditions:
<ul>
   <li>The slot is in accordance to the doctor's "opening_hours" for that day of the week.</li>
   <li>There has been no other booking made for that slot for that doctor on that day.</li>
   <li>The time and date of the slot is after the current time and date. That means if I check for slots at 4 PM on Monday, then I will be able to see slots on Monday that are after 4PM and no slots before the current time will be visible.</li>
   <li>All slots for all doctors are stricltly for 1 hour only.</li>
   <li>The time slots are generated to support non continous opening_hours for the same day as well. This means in the API response if the same "day" has multiple different start and end even then we can deduce all available slots. 

<pre> [{start: 6, end: 13, isClosed: false, day: 'MON'}, {start: 20, end: 22, isClosed: false, day: 'MON'}] </pre>
  In this above example 'MON' has a non continous opening_hours.</li>
</ul>


After the user selects, one of the dates from the most recent dates along with the available time slots, he is asked to click on a "Book Session" button. 
<br/>

<img width="680" alt="Screenshot 2023-11-12 at 1 56 30 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/4f89b1a8-c837-4e00-b82e-dbe03d646ce4">


Once he clicks on it, the final booking step is revealed where he has to enter the booking name and click on "Confirm".

Again the reason to show the user the "Book Session" button was to make that the user does not feel too overwhelmed with too many things right from the start but to slowly render things as needed. 

Also it might to some extent enhance performance especially when the app gets bigger, as with this current workflow we only load and render the components as needed based on the user's actions.


<img width="833" alt="Screenshot 2023-11-12 at 1 59 22 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/77c66b09-372e-4d10-9af9-abd18a3ce7e9">

Initially the confirm button is disabled, but as soon as it gets a name it's enabled.

Also the whole flow is designed in a way such that, that it becomes extremely easy for the user to "modify" the date and time.

Finally, as the user, confirms the booking details, he is redirected to the "/booking-success" page where he is shown the details of his confirmed booking. This link ""/booking-success" with the correct id can be loaded anytime anywhere. 

<img width="976" alt="Screenshot 2023-11-12 at 2 02 10 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/fce47ed0-8532-45e9-83bf-f1c54701922b">

There are some slots in the backend, that are made invalid. For example: Sundays.

In that case when a user tries to book a slot that is invalidated by the backend, the user is shown an error message.

<img width="755" alt="Screenshot 2023-11-12 at 2 03 19 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/a654cacb-467f-492f-a955-205f04f2def9">

All the components like <AvailableSlots/> and <ConfirmBooking/> is again reused in the "View All" modal and the user can finish their booking from the "View All" modal as well.
This has been done so that the user need not to switch back and forth from the modal mulitple times. 

<br/>

<img width="1200" alt="Screenshot 2023-11-12 at 2 04 26 PM" src="https://github.com/techguybiswa/necktie-docs-book-app/assets/25161788/5de22d2c-280a-4041-b2e0-c6b3350a3b70">

We can see that for all the "continue" buttons the color scheme has been "black" and for the confirmation buttons, the color scheme has been "Green".

When  there are no available slots for the selected date we display an error: 

<img width="702" alt="Screenshot 2023-11-13 at 6 57 40 PM" src="https://github.com/techguybiswa/BISWARUP_BANERJEE_FRONT_END_Technical_Assessment/assets/25161788/805e7227-4dff-442c-8986-7f951bd8ad9a">

### Typescript Coverage and Compile 

There is a 99%+ typescript coverage in the project.
To get detailed coverage report please run: 
<pre>npm run ts-coverage</pre>

To run a typescript check in the whole codebase please run

<pre>npm run tsc</pre>

<img width="1173" alt="Screenshot 2023-11-13 at 2 27 27 PM" src="https://github.com/techguybiswa/BISWARUP_BANERJEE_FRONT_END_Technical_Assessment/assets/25161788/1e1a729f-b2e6-42f4-9b1a-9fae42b04768">

## State Management 

Generally for large scale apps, I resort to proper state management libraries like MobX or Redux. 

But in this case, considering the complexity of the app, there was no need to implement redux and there by introduce more non necessary boilerplate code.

So the next option was React Context.

But the React docs suggest not to use React Context just for state management and for passing props.

Hence I planned to stick with the good old prop drilling coupled with "Component Composition" in some cases.


## Choice of packages and libraries.
<ul>
   <li>ReactJS: Apart from all the obvious reasons like being highly scalable and making it super easy to build modular components, the main reason I like to work with react is beacuse none of the other front end libraries (except angular) has that good of a community suport. Also the react team regularly updates React with really amazing features like react context, custom hooks, HoCs, etc.  </li>
   <li>Typescript: The purpose of Typescript was to provide TypeCheck to all my functions and components. I had to use it because it gets really difficult to keep a track of all the different function parameters, component props and api responses. But with typescript you are always aware of all the interfaces and types of a particular function or component props.
The drawback of using typescript that I can think of is that sometimes it can become really complex to deduce the type of a some complex object which in turn might increase the complexity of the app as a whole wihtout providing much business results per se. </li>
   <li>DayJS : Just a 2KB package that makes dealing with date and time super simple and easy. Since momentjs stopped providing support, developers are now switching to Dayjs. Since the project had to deal with date and time I chose to use this.</li>
   <li>Material UI (mui) : I did not want to build every UI component from scratch and hence used the already built MUI components like the calander, the card and other from MUI. Also it can be very easily used/integrated/customized with styled-components (yet another package used in this project) and make things highly reusable. The drawback of using MUI can be related to dependency on a 3rd party library. Like sometimes we end up spending too  much time on customizing certain aspect of MUI. In such cases, its a much better idea to build an in-house design system. Also  there can be issues with SSR  as some version of MUI does not support SSR. </li>
</ul>



## Potential Improvements 

<ul>
   <li>Make the app globally available by supporting different timezones (possible with dayjs) , different languages with i18n and different local currencies </li>
   <li>
      Google calander integration where the user gets a confrimation email and a calander invite for that day and time of his booking.
   </li>
   <li>
      Write unit tests for the functions that generate the available slots. And write e2e tests with Cypress for certain critial workflows.
   </li>
   <li>Make the code app faster by implementing route based code splitting, caching some API responses and minimizing images and JS/CSS. </li>
   <li>Instead of hard coding CSS values like the color hash, implement a proper theme of colors.</li>
   <li>A few of the components in the codebase might be improved even more by removing the in-line styles and implementing a more reusable approach instead.</li>
   <li>The useFecth custom hooked can be improved even more such that the "request" function is only returned for POST requests and for GET the the function is auto executed under an useEffect.</li>
   <li>A chat based UI can be implemented leveraging the OpenAI apis where user can book a slot by typing a text. </li>   
   <li>The UI can be made more responsive across multiple screen sizes.</li>
</ul>

## Assumptions
<ul>
   <li>Some of the dates are blocked and invalidated by the backend which results in an invalid date error. For example Sunday and the current date.</li>
   <li>The UI is not mobile responsive and is only supposed to be run on laptops.</li>
   <li>The UI is good if the list of doctor is not too large. For larger lists we need to implement some more sclable approaches like infinite scrolling or grouping doctors by location or pagination.</li>
</ul>
