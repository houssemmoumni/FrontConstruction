import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { AlertsComponent } from './ui-elements/alerts/alerts.component';
import { AutocompleteComponent } from './ui-elements/autocomplete/autocomplete.component';
import { AvatarsComponent } from './ui-elements/avatars/avatars.component';
import { AccordionComponent } from './ui-elements/accordion/accordion.component';
import { BadgesComponent } from './ui-elements/badges/badges.component';
import { BreadcrumbComponent } from './ui-elements/breadcrumb/breadcrumb.component';
import { ButtonToggleComponent } from './ui-elements/button-toggle/button-toggle.component';
import { BottomSheetComponent } from './ui-elements/bottom-sheet/bottom-sheet.component';
import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
import { CardsComponent } from './ui-elements/cards/cards.component';
import { CarouselsComponent } from './ui-elements/carousels/carousels.component';
import { CheckboxComponent } from './ui-elements/checkbox/checkbox.component';
import { ChipsComponent } from './ui-elements/chips/chips.component';
import { ClipboardComponent } from './ui-elements/clipboard/clipboard.component';
import { DatepickerComponent } from './ui-elements/datepicker/datepicker.component';
import { DialogComponent } from './ui-elements/dialog/dialog.component';
import { DividerComponent } from './ui-elements/divider/divider.component';
import { DragDropComponent } from './ui-elements/drag-drop/drag-drop.component';
import { ExpansionComponent } from './ui-elements/expansion/expansion.component';
import { FormFieldComponent } from './ui-elements/form-field/form-field.component';
import { GridListComponent } from './ui-elements/grid-list/grid-list.component';
import { InputComponent } from './ui-elements/input/input.component';
import { IconComponent } from './ui-elements/icon/icon.component';
import { ListComponent } from './ui-elements/list/list.component';
import { ListboxComponent } from './ui-elements/listbox/listbox.component';
import { MenusComponent } from './ui-elements/menus/menus.component';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { ProgressBarComponent } from './ui-elements/progress-bar/progress-bar.component';
import { RadioComponent } from './ui-elements/radio/radio.component';
import { RatioComponent } from './ui-elements/ratio/ratio.component';
import { SelectComponent } from './ui-elements/select/select.component';
import { SidenavComponent } from './ui-elements/sidenav/sidenav.component';
import { SlideToggleComponent } from './ui-elements/slide-toggle/slide-toggle.component';
import { SliderComponent } from './ui-elements/slider/slider.component';
import { SnackbarComponent } from './ui-elements/snackbar/snackbar.component';
import { StepperComponent } from './ui-elements/stepper/stepper.component';
import { TypographyComponent } from './ui-elements/typography/typography.component';
import { ToolbarComponent } from './ui-elements/toolbar/toolbar.component';
import { TableComponent } from './ui-elements/table/table.component';
import { TabsComponent } from './ui-elements/tabs/tabs.component';
import { TreeComponent } from './ui-elements/tree/tree.component';
import { VideosComponent } from './ui-elements/videos/videos.component';
import { UtilitiesComponent } from './ui-elements/utilities/utilities.component';
import { ColorPickerComponent } from './ui-elements/color-picker/color-picker.component';
import { TooltipComponent } from './ui-elements/tooltip/tooltip.component';
import { ToDoListComponent } from './apps/to-do-list/to-do-list.component';
import { CalendarComponent } from './apps/calendar/calendar.component';
import { ContactsComponent } from './apps/contacts/contacts.component';
import { ChatComponent } from './apps/chat/chat.component';
import { KanbanBoardComponent } from './apps/kanban-board/kanban-board.component';
import { FileManagerComponent } from './apps/file-manager/file-manager.component';
import { MyDriveComponent } from './apps/file-manager/my-drive/my-drive.component';
import { AssetsComponent } from './apps/file-manager/assets/assets.component';
import { ProjectsComponent } from './apps/file-manager/projects/projects.component';
import { PersonalComponent } from './apps/file-manager/personal/personal.component';
import { ApplicationsComponent } from './apps/file-manager/applications/applications.component';
import { DocumentsComponent } from './apps/file-manager/documents/documents.component';
import { MediaComponent } from './apps/file-manager/media/media.component';
import { EmailComponent } from './apps/email/email.component';
import { InboxComponent } from './apps/email/inbox/inbox.component';
import { ComposeComponent } from './apps/email/compose/compose.component';
import { ReadComponent } from './apps/email/read/read.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
import { WizardComponent } from './forms/wizard/wizard.component';
import { EditorsComponent } from './forms/editors/editors.component';
import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
import { DataTableComponent } from './tables/data-table/data-table.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { TablesComponent } from './tables/tables.component';
import { MoreChartsComponent } from './apexcharts/more-charts/more-charts.component';
import { PolarChartsComponent } from './apexcharts/polar-charts/polar-charts.component';
import { PieChartsComponent } from './apexcharts/pie-charts/pie-charts.component';
import { RadarChartsComponent } from './apexcharts/radar-charts/radar-charts.component';
import { RadialBarChartsComponent } from './apexcharts/radial-bar-charts/radial-bar-charts.component';
import { MixedChartsComponent } from './apexcharts/mixed-charts/mixed-charts.component';
import { ColumnChartsComponent } from './apexcharts/column-charts/column-charts.component';
import { AreaChartsComponent } from './apexcharts/area-charts/area-charts.component';
import { LineChartsComponent } from './apexcharts/line-charts/line-charts.component';
import { ApexchartsComponent } from './apexcharts/apexcharts.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TestimonialsPageComponent } from './pages/testimonials-page/testimonials-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RemixiconComponent } from './icons/remixicon/remixicon.component';
import { MaterialSymbolsComponent } from './icons/material-symbols/material-symbols.component';
import { IconsComponent } from './icons/icons.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { TeamsComponent } from './pages/profile-page/teams/teams.component';
import { UserProfileComponent } from './pages/profile-page/user-profile/user-profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { StarterComponent } from './starter/starter.component';
import { ProfileSettingsComponent } from './pages/social-page/profile-settings/profile-settings.component';
import { ActivityComponent } from './pages/social-page/profile/activity/activity.component';
import { AboutComponent } from './pages/social-page/profile/about/about.component';
import { TimelineComponent } from './pages/social-page/profile/timeline/timeline.component';
import { ProfileComponent } from './pages/social-page/profile/profile.component';
import { SocialPageComponent } from './pages/social-page/social-page.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { EditAnEventComponent } from './pages/events-page/edit-an-event/edit-an-event.component';
import { CreateAnEventComponent } from './pages/events-page/create-an-event/create-an-event.component';
import { EventDetailsComponent } from './pages/events-page/event-details/event-details.component';
import { EventsListComponent } from './pages/events-page/events-list/events-list.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { HdReportsComponent } from './pages/help-desk-page/hd-reports/hd-reports.component';
import { HdAgentsComponent } from './pages/help-desk-page/hd-agents/hd-agents.component';
import { HdTicketDetailsComponent } from './pages/help-desk-page/hd-ticket-details/hd-ticket-details.component';
import { HdTicketsComponent } from './pages/help-desk-page/hd-tickets/hd-tickets.component';
import { HelpDeskPageComponent } from './pages/help-desk-page/help-desk-page.component';
import { LInstructorsComponent } from './pages/lms-page/l-instructors/l-instructors.component';
import { LEditCourseComponent } from './pages/lms-page/l-edit-course/l-edit-course.component';
import { LCreateCourseComponent } from './pages/lms-page/l-create-course/l-create-course.component';
import { LCourseDetailsComponent } from './pages/lms-page/l-course-details/l-course-details.component';
import { LCoursesComponent } from './pages/lms-page/l-courses/l-courses.component';
import { LmsPageComponent } from './pages/lms-page/lms-page.component';
import { PmEditUserComponent } from './pages/project-management-page/pm-edit-user/pm-edit-user.component';
import { PmCreateUserComponent } from './pages/project-management-page/pm-create-user/pm-create-user.component';
import { PmUsersComponent } from './pages/project-management-page/pm-users/pm-users.component';
import { PmKanbanBoardComponent } from './pages/project-management-page/pm-kanban-board/pm-kanban-board.component';
import { PmTeamsComponent } from './pages/project-management-page/pm-teams/pm-teams.component';
import { PmClientsComponent } from './pages/project-management-page/pm-clients/pm-clients.component';
import { PmCreateProjectComponent } from './pages/project-management-page/pm-create-project/pm-create-project.component';
import { PmProjectsListComponent } from './pages/project-management-page/pm-projects-list/pm-projects-list.component';
import { PmUpdateAssuranceComponent } from './pages/project-management-page/pm-update-assurance/pm-update-assurance.component';
import { PmProjectOverviewComponent } from './pages/project-management-page/pm-project-overview/pm-project-overview.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { ContratPageComponent } from './pages/contrat-page/contrat-page.component';
import { PmCreateContratComponent } from './pages/contrat-page/pm-create-contrat/pm-create-contrat.component';
import { PmContratListComponent } from './pages/contrat-page/pm-contrats-list/pm-contrat-list.component';
import { PmUpdateContratComponent } from './pages/contrat-page/pm-update-contrat/pm-update-contrat.component';
import { PmMaintenanceListComponent } from './pages/maintenance-page/pm-maintenances-list/pm-maintenance-list.component';
import { PmUpdateMaintenanceComponent } from './pages/maintenance-page/pm-update-maintenance/pm-update-maintenance.component';
import { CCreateDealComponent } from './pages/crm-page/c-create-deal/c-create-deal.component';
import { CDealsComponent } from './pages/crm-page/c-deals/c-deals.component';
import { CLeadsComponent } from './pages/crm-page/c-leads/c-leads.component';
import { CEditLeadComponent } from './pages/crm-page/c-edit-lead/c-edit-lead.component';
import { CCreateLeadComponent } from './pages/crm-page/c-create-lead/c-create-lead.component';
import { CCustomersComponent } from './pages/crm-page/c-customers/c-customers.component';
import { CEditContactComponent } from './pages/crm-page/c-edit-contact/c-edit-contact.component';
import { CCreateContactComponent } from './pages/crm-page/c-create-contact/c-create-contact.component';
import { CContactsComponent } from './pages/crm-page/c-contacts/c-contacts.component';
import { CrmPageComponent } from './pages/crm-page/crm-page.component';
import { EReviewsComponent } from './pages/ecommerce-page/e-reviews/e-reviews.component';
import { EEditCategoryComponent } from './pages/ecommerce-page/e-edit-category/e-edit-category.component';
import { ECreateCategoryComponent } from './pages/ecommerce-page/e-create-category/e-create-category.component';
import { ECategoriesComponent } from './pages/ecommerce-page/e-categories/e-categories.component';
import { ERefundsComponent } from './pages/ecommerce-page/e-refunds/e-refunds.component';
import { ECreateSellerComponent } from './pages/ecommerce-page/e-create-seller/e-create-seller.component';
import { ESellerDetailsComponent } from './pages/ecommerce-page/e-seller-details/e-seller-details.component';
import { ESellersComponent } from './pages/ecommerce-page/e-sellers/e-sellers.component';
import { ECheckoutComponent } from './pages/ecommerce-page/e-checkout/e-checkout.component';
import { ECartComponent } from './pages/ecommerce-page/e-cart/e-cart.component';
import { ECustomerDetailsComponent } from './pages/ecommerce-page/e-customer-details/e-customer-details.component';
import { ECustomersComponent } from './pages/ecommerce-page/e-customers/e-customers.component';
import { EOrderTrackingComponent } from './pages/ecommerce-page/e-order-tracking/e-order-tracking.component';
import { ECreateOrderComponent } from './pages/ecommerce-page/e-create-order/e-create-order.component';
import { EOrderDetailsComponent } from './pages/ecommerce-page/e-order-details/e-order-details.component';
import { EOrdersComponent } from './pages/ecommerce-page/e-orders/e-orders.component';
import { EEditProductComponent } from './pages/ecommerce-page/e-edit-product/e-edit-product.component';
import { ECreateProductComponent } from './pages/ecommerce-page/e-create-product/e-create-product.component';
import { EProductDetailsComponent } from './pages/ecommerce-page/e-product-details/e-product-details.component';
import { EProductsListComponent } from './pages/ecommerce-page/e-products-list/e-products-list.component';
import { EProductsGridComponent } from './pages/ecommerce-page/e-products-grid/e-products-grid.component';
import { EcommercePageComponent } from './pages/ecommerce-page/ecommerce-page.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';

//front
import { HeaderStyle1Component } from './front/features/header-style1/header-style1.component';
import { HeaderStyle2Component } from './front/features/header-style2/header-style2.component';
import { HeaderStyle3Component } from './front/features/header-style3/header-style3.component';
import { HeaderStyle4Component } from './front/features/header-style4/header-style4.component';
import { HeaderStyle5Component } from './front/features/header-style5/header-style5.component';
import { HeaderStyle6Component } from './front/features/header-style6/header-style6.component';
import { HeaderStyleDark1Component } from './front/features/header-style-dark1/header-style-dark1.component';
import { HeaderStyleDark2Component } from './front/features/header-style-dark2/header-style-dark2.component';
import { HeaderStyleDark3Component } from './front/features/header-style-dark3/header-style-dark3.component';
import { HeaderStyleDark4Component } from './front/features/header-style-dark4/header-style-dark4.component';
import { HeaderStyleDark5Component } from './front/features/header-style-dark5/header-style-dark5.component';
import { HeaderStyleDark6Component } from './front/features/header-style-dark6/header-style-dark6.component';
import { AboutUs1Component } from './front/pages/about-us1/about-us1.component';
import { AboutUs2Component } from './front/pages/about-us2/about-us2.component';
import { Error403Component } from './front/pages/error403/error403.component';
import { Error404Component } from './front/pages/error404/error404.component';
import { Error405Component } from './front/pages/error405/error405.component';
import { Faq1Component } from './front/pages/faq1/faq1.component';
import { Faq2Component } from './front/pages/faq2/faq2.component';
import { PortfolioDetailsComponent } from './front/pages/portfolio-details/portfolio-details.component';
import { PortfolioGrid2Component } from './front/pages/portfolio-grid2/portfolio-grid2.component';
import { PortfolioGrid3Component } from './front/pages/portfolio-grid3/portfolio-grid3.component';
import { PortfolioGrid4Component } from './front/pages/portfolio-grid4/portfolio-grid4.component';
import { ServicesDetailsComponent } from './front/pages/services-details/services-details.component';
import { Services1Component } from './front/pages/services1/services1.component';
import { Services2Component } from './front/pages/services2/services2.component';
import { Team1Component } from './front/pages/team1/team1.component';
import { Team2Component } from './front/pages/team2/team2.component';
import { ShopCartComponent } from './front/shop/shop-cart/shop-cart.component';
import { ShopLoginComponent } from './front/shop/shop-login/shop-login.component';
import { ShopProductDetailsComponent } from './front/shop/shop-product-details/shop-product-details.component';
import { ShopRegisterComponent } from './front/shop/shop-register/shop-register.component';
import { ShopCheckoutComponent } from './front/shop/shop-checkout/shop-checkout.component';
import { ShopSidebarComponent } from './front/shop/shop-sidebar/shop-sidebar.component';
import { ShopWishlistComponent } from './front/shop/shop-wishlist/shop-wishlist.component';
import { ShopComponent } from './front/shop/shop/shop.component';
import { Grid2SidebarLeftComponent } from './front/blog/grid2-sidebar-left/grid2-sidebar-left.component';
import { Grid2SidebarComponent } from './front/blog/grid2-sidebar/grid2-sidebar.component';
import { Grid2Component } from './front/blog/grid2/grid2.component';
import { Grid3SidebarLeftComponent } from './front/blog/grid3-sidebar-left/grid3-sidebar-left.component';
import { Grid3SidebarComponent } from './front/blog/grid3-sidebar/grid3-sidebar.component';
import { Grid3Component } from './front/blog/grid3/grid3.component';
import { Grid4Component } from './front/blog/grid4/grid4.component';
import { HalfImageSidebarLeftComponent } from './front/blog/half-image-sidebar-left/half-image-sidebar-left.component';
import { HalfImageSidebarComponent } from './front/blog/half-image-sidebar/half-image-sidebar.component';
import { HalfImageComponent } from './front/blog/half-image/half-image.component';
import { LargeImageSidebarLeftComponent } from './front/blog/large-image-sidebar-left/large-image-sidebar-left.component';
import { LargeImageSidebarComponent } from './front/blog/large-image-sidebar/large-image-sidebar.component';
import { LargeImageComponent } from './front/blog/large-image/large-image.component';
import { SingleSidebarLeftComponent } from './front/blog/single-sidebar-left/single-sidebar-left.component';
import { SingleSidebarComponent } from './front/blog/single-sidebar/single-sidebar.component';
import { SingleComponent } from './front/blog/single/single.component';
import { ContactUs1Component } from './front/pages/contact-us1/contact-us1.component';
import { ContactUs2Component } from './front/pages/contact-us2/contact-us2.component';
import { ContactUs3Component } from './front/pages/contact-us3/contact-us3.component';
import { ContactUs4Component } from './front/pages/contact-us4/contact-us4.component';
import { HomeAgricultureComponent } from './front/home-agriculture/home-agriculture.component';
import { HomeBeerFactoryComponent } from './front/home-beer-factory/home-beer-factory.component';
import { HomeCarIndustryComponent } from './front/home-car-industry/home-car-industry.component';
import { HomeConstructComponent } from './front/home-construct/home-construct.component';
import { HomeFactoryComponent } from './front/home-factory/home-factory.component';
import { HomeFoodIndustryComponent } from './front/home-food-industry/home-food-industry.component';
import { HomeLeatherIndustryComponent } from './front/home-leather-industry/home-leather-industry.component';
import { HomeMiningIndustryComponent } from './front/home-mining-industry/home-mining-industry.component';
import { HomeNuclearPlantComponent } from './front/home-nuclear-plant/home-nuclear-plant.component';
import { HomeOilPlantComponent } from './front/home-oil-plant/home-oil-plant.component';
import { HomePlasticIndustryComponent } from './front/home-plastic-industry/home-plastic-industry.component';
import { HomeShipIndustryComponent } from './front/home-ship-industry/home-ship-industry.component';
import { HomeSolarPlantComponent } from './front/home-solar-plant/home-solar-plant.component';
import { HomeSteelPlantComponent } from './front/home-steel-plant/home-steel-plant.component';
import { IndexComponent } from './front/index/index.component';
import { CreateMaintenanceComponent } from './front/pages/maintenance/create-maintenance/create-maintenance.component';


export const routes: Routes = [
    { path: '', component: EcommerceComponent },
    { path: 'crm', component: CrmComponent },
    { path: 'project-management', component: ProjectManagementComponent },
    { path: 'lms', component: LmsComponent },
    { path: 'help-desk', component: HelpDeskComponent },
    { path: 'to-do-list', component: ToDoListComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'kanban-board', component: KanbanBoardComponent },

    {
        path: 'file-manager',
        component: FileManagerComponent,
        children: [
            { path: '', component: MyDriveComponent },
            { path: 'assets', component: AssetsComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'applications', component: ApplicationsComponent },
            { path: 'documents', component: DocumentsComponent },
            { path: 'media', component: MediaComponent },
        ],
    },
    {
        path: 'email',
        component: EmailComponent,
        children: [
            { path: '', component: InboxComponent },
            { path: 'compose', component: ComposeComponent },
            { path: 'read', component: ReadComponent },
        ],
    },
    {
        path: 'ecommerce-page',
        component: EcommercePageComponent,
        children: [
            { path: '', component: EProductsGridComponent },
            { path: 'products-list', component: EProductsListComponent },
            { path: 'product-details', component: EProductDetailsComponent },
            { path: 'create-product', component: ECreateProductComponent },
            { path: 'edit-product', component: EEditProductComponent },
            { path: 'orders', component: EOrdersComponent },
            { path: 'order-details', component: EOrderDetailsComponent },
            { path: 'create-order', component: ECreateOrderComponent },
            { path: 'order-tracking', component: EOrderTrackingComponent },
            { path: 'customers', component: ECustomersComponent },
            { path: 'customer-details', component: ECustomerDetailsComponent },
            { path: 'cart', component: ECartComponent },
            { path: 'checkout', component: ECheckoutComponent },
            { path: 'sellers', component: ESellersComponent },
            { path: 'seller-details', component: ESellerDetailsComponent },
            { path: 'create-seller', component: ECreateSellerComponent },
            { path: 'refunds', component: ERefundsComponent },
            { path: 'categories', component: ECategoriesComponent },
            { path: 'create-category', component: ECreateCategoryComponent },
            { path: 'edit-category', component: EEditCategoryComponent },
            { path: 'reviews', component: EReviewsComponent },
        ],
    },
    {
        path: 'crm-page',
        component: CrmPageComponent,
        children: [
            { path: '', component: CContactsComponent },
            { path: 'create-contact', component: CCreateContactComponent },
            { path: 'edit-contact', component: CEditContactComponent },
            { path: 'customers', component: CCustomersComponent },
            { path: 'create-lead', component: CCreateLeadComponent },
            { path: 'edit-lead', component: CEditLeadComponent },
            { path: 'leads', component: CLeadsComponent },
            { path: 'deals', component: CDealsComponent },
            { path: 'create-deal', component: CCreateDealComponent },
        ],
    },
    {
        path: 'project-management-page',
        component: ProjectManagementPageComponent,
        children: [
            { path: '', component: PmProjectOverviewComponent },
            { path: 'assurances-list', component: PmProjectsListComponent },
            { path: 'create-assurance', component: PmCreateProjectComponent },
            { path: 'update-assurance/:id', component: PmUpdateAssuranceComponent },
            { path: 'clients', component: PmClientsComponent },
            { path: 'teams', component: PmTeamsComponent },
            { path: 'kanban-board', component: PmKanbanBoardComponent },
            { path: 'users', component: PmUsersComponent },
            { path: 'create-user', component: PmCreateUserComponent },
            { path: 'edit-user', component: PmEditUserComponent },
        ],
    },
    {
        path: 'contrat-page',
        component: ContratPageComponent,
        children: [
            { path: '', component: PmProjectOverviewComponent },
            { path: 'contrats-list', component: PmContratListComponent },
            { path: 'create-contrat', component: PmCreateContratComponent },
            { path: 'update-contrat/:id', component: PmUpdateContratComponent },

            //{ path: 'clients', component: PmClientsComponent },
            //{ path: 'teams', component: PmTeamsComponent },
            //{ path: 'kanban-board', component: PmKanbanBoardComponent },
            //{ path: 'users', component: PmUsersComponent },
            //{ path: 'create-user', component: PmCreateUserComponent },
            //{ path: 'edit-user', component: PmEditUserComponent },
        ],
    },
    {
        path: 'maintenance-page',
        component: ContratPageComponent,
        children: [
            { path: '', component: PmProjectOverviewComponent },
            { path: 'maintenances-list', component: PmMaintenanceListComponent },
            { path: 'front/create-maintenance', component: CreateMaintenanceComponent },
            { path: 'update-maintenance/:id', component: PmUpdateMaintenanceComponent },
            //{ path: 'clients', component: PmClientsComponent },
            //{ path: 'teams', component: PmTeamsComponent },
            //{ path: 'kanban-board', component: PmKanbanBoardComponent },
            //{ path: 'users', component: PmUsersComponent },
            //{ path: 'create-user', component: PmCreateUserComponent },
            //{ path: 'edit-user', component: PmEditUserComponent },
        ],
    },
    {
        path: 'lms-page',
        component: LmsPageComponent,
        children: [
            { path: '', component: LCoursesComponent },
            { path: 'course-details', component: LCourseDetailsComponent },
            { path: 'create-course', component: LCreateCourseComponent },
            { path: 'edit-course', component: LEditCourseComponent },
            { path: 'instructors', component: LInstructorsComponent },
        ],
    },
    {
        path: 'help-desk-page',
        component: HelpDeskPageComponent,
        children: [
            { path: '', component: HdTicketsComponent },
            { path: 'ticket-details', component: HdTicketDetailsComponent },
            { path: 'agents', component: HdAgentsComponent },
            { path: 'reports', component: HdReportsComponent },
        ],
    },
    {
        path: 'events',
        component: EventsPageComponent,
        children: [
            { path: '', component: EventsListComponent },
            { path: 'event-details', component: EventDetailsComponent },
            { path: 'create-an-event', component: CreateAnEventComponent },
            { path: 'edit-an-event', component: EditAnEventComponent },
        ],
    },
    {
        path: 'invoices',
        component: InvoicesPageComponent,
        children: [
            { path: '', component: InvoicesComponent },
            { path: 'invoice-details', component: InvoiceDetailsComponent },
        ],
    },
    {
        path: 'social',
        component: SocialPageComponent,
        children: [
            {
                path: '',
                component: ProfileComponent,
                children: [
                    { path: '', component: TimelineComponent },
                    { path: 'about', component: AboutComponent },
                    { path: 'activity', component: ActivityComponent },
                ],
            },
            { path: 'settings', component: ProfileSettingsComponent },
        ],
    },
    { path: 'starter', component: StarterComponent },
    { path: 'faq', component: FaqPageComponent },
    { path: 'pricing', component: PricingPageComponent },
    { path: 'maps', component: MapsPageComponent },
    { path: 'notifications', component: NotificationsPageComponent },
    { path: 'members', component: MembersPageComponent },
    {
        path: 'users',
        component: UsersPageComponent,
        children: [
            { path: '', component: TeamMembersComponent },
            { path: 'users-list', component: UsersListComponent },
            { path: 'add-user', component: AddUserComponent },
        ],
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        children: [
            { path: '', component: UserProfileComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'projects', component: PProjectsComponent },
        ],
    },
    {
        path: 'icons',
        component: IconsComponent,
        children: [
            { path: '', component: MaterialSymbolsComponent },
            { path: 'remixicon', component: RemixiconComponent },
        ],
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            { path: '', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'lock-screen', component: LockScreenComponent },
            { path: 'confirm-email', component: ConfirmEmailComponent },
            { path: 'logout', component: LogoutComponent },
        ],
    },
    { path: 'my-profile', component: MyProfileComponent },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            { path: '', component: AccountSettingsComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'connections', component: ConnectionsComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms-conditions', component: TermsConditionsComponent },
        ],
    },
    { path: 'timeline', component: TimelinePageComponent },
    { path: 'gallery', component: GalleryPageComponent },
    { path: 'testimonials', component: TestimonialsPageComponent },
    { path: 'search', component: SearchPageComponent },
    { path: 'coming-soon', component: ComingSoonPageComponent },
    { path: 'blank-page', component: BlankPageComponent },
    { path: 'internal-error', component: InternalErrorComponent },
    { path: 'widgets', component: WidgetsComponent },
    {
        path: 'charts',
        component: ApexchartsComponent,
        children: [
            { path: '', component: LineChartsComponent },
            { path: 'area', component: AreaChartsComponent },
            { path: 'column', component: ColumnChartsComponent },
            { path: 'mixed', component: MixedChartsComponent },
            { path: 'radialbar', component: RadialBarChartsComponent },
            { path: 'radar', component: RadarChartsComponent },
            { path: 'pie', component: PieChartsComponent },
            { path: 'polar', component: PolarChartsComponent },
            { path: 'more', component: MoreChartsComponent },
        ],
    },
    {
        path: 'tables',
        component: TablesComponent,
        children: [
            { path: '', component: BasicTableComponent },
            { path: 'data-table', component: DataTableComponent },
        ],
    },
    {
        path: 'ui-kit',
        component: UiElementsComponent,
        children: [
            { path: '', component: AlertsComponent },
            { path: 'autocomplete', component: AutocompleteComponent },
            { path: 'avatars', component: AvatarsComponent },
            { path: 'accordion', component: AccordionComponent },
            { path: 'badges', component: BadgesComponent },
            { path: 'breadcrumb', component: BreadcrumbComponent },
            { path: 'button-toggle', component: ButtonToggleComponent },
            { path: 'bottom-sheet', component: BottomSheetComponent },
            { path: 'buttons', component: ButtonsComponent },
            { path: 'cards', component: CardsComponent },
            { path: 'carousels', component: CarouselsComponent },
            { path: 'checkbox', component: CheckboxComponent },
            { path: 'chips', component: ChipsComponent },
            { path: 'color-picker', component: ColorPickerComponent },
            { path: 'clipboard', component: ClipboardComponent },
            { path: 'datepicker', component: DatepickerComponent },
            { path: 'dialog', component: DialogComponent },
            { path: 'divider', component: DividerComponent },
            { path: 'drag-drop', component: DragDropComponent },
            { path: 'expansion', component: ExpansionComponent },
            { path: 'form-field', component: FormFieldComponent },
            { path: 'grid-list', component: GridListComponent },
            { path: 'input', component: InputComponent },
            { path: 'icon', component: IconComponent },
            { path: 'list', component: ListComponent },
            { path: 'listbox', component: ListboxComponent },
            { path: 'menus', component: MenusComponent },
            { path: 'pagination', component: PaginationComponent },
            { path: 'progress-bar', component: ProgressBarComponent },
            { path: 'radio', component: RadioComponent },
            { path: 'ratio', component: RatioComponent },
            { path: 'select', component: SelectComponent },
            { path: 'sidenav', component: SidenavComponent },
            { path: 'slide-toggle', component: SlideToggleComponent },
            { path: 'slider', component: SliderComponent },
            { path: 'snackbar', component: SnackbarComponent },
            { path: 'stepper', component: StepperComponent },
            { path: 'typography', component: TypographyComponent },
            { path: 'tooltip', component: TooltipComponent },
            { path: 'toolbar', component: ToolbarComponent },
            { path: 'table', component: TableComponent },
            { path: 'tabs', component: TabsComponent },
            { path: 'tree', component: TreeComponent },
            { path: 'videos', component: VideosComponent },
            { path: 'utilities', component: UtilitiesComponent },
        ],
    },
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            { path: '', component: BasicElementsComponent },
            { path: 'advanced-elements', component: AdvancedElementsComponent },
            { path: 'wizard', component: WizardComponent },
            { path: 'editors', component: EditorsComponent },
            { path: 'file-uploader', component: FileUploaderComponent },
        ],
    },

    //front routes
    { path: 'front', component: IndexComponent },
    // home ---
    { path: 'fron/home', component: IndexComponent },
    { path: 'front/index', component: IndexComponent },
    { path: 'front/create-maintenance', component: CreateMaintenanceComponent },
    { path: 'front/index-2', component: HomeOilPlantComponent },
    { path: 'front/home-oil-plant', component: HomeOilPlantComponent },
    { path: 'front/index-3', component: HomeSteelPlantComponent },
    { path: 'front/home-steel-plant', component: HomeSteelPlantComponent },
    { path: 'front/index-4', component: HomeFactoryComponent },
    { path: 'front/home-factory', component: HomeFactoryComponent },
    { path: 'front/index-5', component: HomeConstructComponent },
    { path: 'front/home-construct', component: HomeConstructComponent },
    { path: 'front/index-6', component: HomeSolarPlantComponent },
    { path: 'front/home-solar-plant', component: HomeSolarPlantComponent },
    { path: 'front/index-7', component: HomeFoodIndustryComponent },
    { path: 'front/home-food-industry', component: HomeFoodIndustryComponent },
    { path: 'front/index-8', component: HomeAgricultureComponent },
    { path: 'front/home-agriculture', component: HomeAgricultureComponent },
    { path: 'front/index-9', component: HomeShipIndustryComponent },
    { path: 'front/home-ship-industry', component: HomeShipIndustryComponent },
    { path: 'front/index-10', component: HomeLeatherIndustryComponent },
    {
        path: 'front/home-leather-industry',
        component: HomeLeatherIndustryComponent,
    },
    { path: 'front/index-11', component: HomeNuclearPlantComponent },
    { path: 'front/home-nuclear-plant', component: HomeNuclearPlantComponent },
    { path: 'front/index-12', component: HomeBeerFactoryComponent },
    { path: 'front/home-beer-factory', component: HomeBeerFactoryComponent },
    { path: 'front/index-13', component: HomeMiningIndustryComponent },
    {
        path: 'front/home-mining-industry',
        component: HomeMiningIndustryComponent,
    },
    { path: 'front/index-14', component: HomeCarIndustryComponent },
    { path: 'front/home-car-industry', component: HomeCarIndustryComponent },
    { path: 'front/index-15', component: HomePlasticIndustryComponent },
    {
        path: 'front/home-plastic-industry',
        component: HomePlasticIndustryComponent,
    },

    // Features ----
    { path: 'front/header-style-1', component: HeaderStyle1Component },
    { path: 'front/header-style-2', component: HeaderStyle2Component },
    { path: 'front/header-style-3', component: HeaderStyle3Component },
    { path: 'front/header-style-4', component: HeaderStyle4Component },
    { path: 'front/header-style-5', component: HeaderStyle5Component },
    { path: 'front/header-style-6', component: HeaderStyle6Component },
    { path: 'front/header-style-dark-1', component: HeaderStyleDark1Component },
    { path: 'front/header-style-dark-2', component: HeaderStyleDark2Component },
    { path: 'front/header-style-dark-3', component: HeaderStyleDark3Component },
    { path: 'front/header-style-dark-4', component: HeaderStyleDark4Component },
    { path: 'front/header-style-dark-5', component: HeaderStyleDark5Component },
    { path: 'front/header-style-dark-6', component: HeaderStyleDark6Component },
    // {path: 'footer-1', component: FooterStyle1Component},
    // {path: 'footer-2', component: FooterStyle2Component},
    // {path: 'footer-3', component: FooterStyle3Component},
    // {path: 'footer-4', component: FooterStyle4Component},
    // {path: 'footer-5', component: FooterStyle5Component},
    // {path: 'footer-6', component: FooterStyle6Component},
    // {path: 'footer-7', component: FooterStyle7Component},
    // {path: 'footer-8', component: FooterStyle8Component},
    // {path: 'footer-9', component: FooterStyle9Component},
    // {path: 'footer-10', component: FooterStyle10Component},
    // {path: 'footer-11', component: FooterStyle11Component},
    // {path: 'footer-12', component: FooterStyle12Component},

    // Pages  ----
    { path: 'front/about-1', component: AboutUs1Component },
    { path: 'front/about-2', component: AboutUs2Component },
    { path: 'front/services-1', component: Services1Component },
    { path: 'front/services-2', component: Services2Component },
    { path: 'front/services-details', component: ServicesDetailsComponent },
    { path: 'front/team-1', component: Team1Component },
    { path: 'front/team-2', component: Team2Component },
    { path: 'front/faq-1', component: Faq1Component },
    { path: 'front/faq-2', component: Faq2Component },
    { path: 'front/portfolio-grid-2', component: PortfolioGrid2Component },
    { path: 'front/portfolio-grid-3', component: PortfolioGrid3Component },
    { path: 'front/portfolio-grid-4', component: PortfolioGrid4Component },
    { path: 'front/portfolio-details', component: PortfolioDetailsComponent },
    { path: 'front/error-403', component: Error403Component },
    { path: 'front/error-404', component: Error404Component },
    { path: 'front/error-405', component: Error405Component },
    { path: 'front/help-desk', component: HelpDeskComponent },
    { path: 'front/privacy-policy', component: PrivacyPolicyComponent },

    // Shop ----
    { path: 'front/shop', component: ShopComponent },
    { path: 'front/shop-sidebar', component: ShopSidebarComponent },
    {
        path: 'front/shop-product-details',
        component: ShopProductDetailsComponent,
    },
    { path: 'front/shop-cart', component: ShopCartComponent },
    { path: 'front/shop-wishlist', component: ShopWishlistComponent },
    { path: 'front/shop-checkout', component: ShopCheckoutComponent },
    { path: 'front/shop-login', component: ShopLoginComponent },
    { path: 'front/shop-register', component: ShopRegisterComponent },

    // Blogs ----
    { path: 'front/blog-half-img', component: HalfImageComponent },
    {
        path: 'front/blog-half-img-sidebar',
        component: HalfImageSidebarComponent,
    },
    {
        path: 'front/blog-half-img-left-sidebar',
        component: HalfImageSidebarLeftComponent,
    },
    { path: 'front/blog-large-img', component: LargeImageComponent },
    {
        path: 'front/blog-large-img-sidebar',
        component: LargeImageSidebarComponent,
    },
    {
        path: 'front/blog-large-img-left-sidebar',
        component: LargeImageSidebarLeftComponent,
    },
    { path: 'front/blog-grid-2', component: Grid2Component },
    { path: 'front/blog-grid-2-sidebar', component: Grid2SidebarComponent },
    {
        path: 'front/blog-grid-2-sidebar-left',
        component: Grid2SidebarLeftComponent,
    },
    { path: 'front/blog-grid-3', component: Grid3Component },
    { path: 'front/blog-grid-3-sidebar', component: Grid3SidebarComponent },
    {
        path: 'front/blog-grid-3-sidebar-left',
        component: Grid3SidebarLeftComponent,
    },
    { path: 'front/blog-grid-4', component: Grid4Component },
    { path: 'front/blog-single', component: SingleComponent },
    { path: 'front/blog-single-sidebar', component: SingleSidebarComponent },
    {
        path: 'front/blog-single-left-sidebar',
        component: SingleSidebarLeftComponent,
    },

    // Contact ---
    { path: 'front/contact-1', component: ContactUs1Component },
    { path: 'front/contact-2', component: ContactUs2Component },
    { path: 'front/contact-3', component: ContactUs3Component },
    { path: 'front/contact-4', component: ContactUs4Component },
    // Here add new pages component

    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
